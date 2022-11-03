import { calculateOrderTotal, findPrendaPrecioByTypeAndComplexity, getAtributosPrenda, updateExpiredOrders } from '@backend/dbcalls/order';
import { OrderCreationDataSchema } from '@backend/schemas/OrderCreationSchema';
import { prisma } from '@server/db/client';
import { generateEmailer } from '@utils/email/generateEmailer';
import { newOrderNotificationHTML } from '@utils/email/newOrderNotification';
import { checkIfUserExists, fromToday } from '@backend/dbcalls/user';
import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from 'zod';
import { generateOrderID } from '@utils/generateOrderID';

const handleOrderCreation = async (req: NextApiRequest, res: NextApiResponse) => {



    try {
        const data = OrderCreationDataSchema.parse(req.body);
        const { id: idComplejidad } = await prisma.complejidadConfeccion.findFirst({ where: { name: data.complejidad } })

        const selectedAttributes = Object.entries(data).filter(([, value]: [string, any]) => value?.selected && value?.selected === true).map(([key]) => key)

        const selectedServices = await prisma.servicio.findMany({ select: { name: true }, where: { name: { in: selectedAttributes } } })

        const idOrden = generateOrderID(data)

        const { sendEmail } = generateEmailer({
            password: process.env.MAILGUN_SMTP_PASS,
            user: 'postmaster@gasppo.lol',
            from: 'soporte@gasppo.lol',
            fromTitle: 'Soporte HS-Taller'
        })

        await updateExpiredOrders();

        const prendaPrecio = await findPrendaPrecioByTypeAndComplexity(data.tipoPrenda.id, idComplejidad);
        const precio = await calculateOrderTotal(data, idComplejidad)
        const atributosPrenda = await getAtributosPrenda(data)
        const { id: idEstadoBase } = await prisma.estadoOrden.findFirst({ where: { nombre: 'Aguardando Confirmación' } })
        const user = await checkIfUserExists({ email: data.user.email })
        const orden = await prisma.orden.create({
            data: {
                id: idOrden,
                nombre: data.nombreProducto,
                cantidad: 100,
                expiresAt: fromToday(60 * 60 * 24 * 15),
                estado: {
                    connect: { id: idEstadoBase }
                },
                prenda: {
                    connect: { id: prendaPrecio.id }
                },
                user: {
                    connect: { id: user.id }
                },
                archivos: {
                    createMany: {
                        data: [
                            ...data.orderFiles.files.map(file => ({ name: file.name || '', urlID: file.urlID || '', type: 'order' })),
                        ]
                    }
                },
                cotizacionOrden: {
                    create: {
                        precio: precio,
                    }
                },
                detallesPrenda: {
                    create: {
                        atributos: {
                            createMany: {
                                data: atributosPrenda.map(atr => ({ name: atr.name, observacion: atr.observaciones, cantidad: atr.cantidad }))
                            }
                        }
                    }
                },
                //Connect the order to services by finding the service by name and checking if it was selected orderData[service.name].selected
                servicios: {
                    connect: selectedServices.map(service => ({ name: service.name }))
                }
            }
        })

        await sendEmail({
            html: newOrderNotificationHTML({ name: user.name, orderId: orden.id }),
            to: user.email,
            subject: 'Orden creada'
        })

        res.status(200).json({ message: 'Orden creada con éxito', data: orden });

    } catch (e) {
        if (e instanceof ZodError) {
            e.format
            res.status(400).json({ error: e.flatten() })
        }
        else {
            res.status(400).json({ error: e })
        }
    }


}

export default handleOrderCreation;