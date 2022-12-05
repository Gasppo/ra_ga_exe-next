import { calculateOrderTotal, findPrendaPrecioByTypeAndComplexity, getAtributosPrenda, updateExpiredOrders } from '@backend/dbcalls/order';
import { checkIfUserExists, fromToday } from '@backend/dbcalls/user';
import { OrderCreationDataSchema } from '@backend/schemas/OrderCreationSchema';
import { prisma } from '@server/db/client';
import { generateEmailer } from '@utils/email/generateEmailer';
import { newOrderNotificationHTML } from '@utils/email/newOrderNotification';
import { generateOrderID } from '@utils/generateOrderID';
import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from 'zod';

const handleOrderCreation = async (req: NextApiRequest, res: NextApiResponse) => {



    try {
        const data = OrderCreationDataSchema.parse(req.body);
        const { id: idComplejidad } = await prisma.complejidadConfeccion.findFirst({ where: { name: data.complejidad } })


        const selectedAttributes = Object.entries(data).filter(([, value]: [string, any]) => value?.selected && value?.selected === true).map(([key]) => key)

        const procesos = await prisma.procesoDesarrollo.findMany({ include: { servicio: true } })
        const selectedServices = await prisma.servicio.findMany({ select: { name: true, procesos: true }, where: { name: { in: selectedAttributes } } })

        const processCreateMap = procesos.map(proc => {
            const { servicio } = proc
            const selected = servicio.some(serv => selectedAttributes.includes(serv.name))
            return {
                idEstadoProceso: selected || servicio.length === 0 ? 1 : 3,
                idProceso: proc.id,
            }
        })

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
            include: { user: true, estado: true, archivos: true, servicios: true, cotizacionOrden: true, procesos: true },
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
                            ...data.orderFiles.files.map(file => ({ name: file.name || '', urlID: file.urlID || '', type: file.type })),
                        ]
                    }
                },
                cotizacionOrden: {
                    create: {
                        precio: precio.precioTotal,
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
                servicios: {
                    connect: selectedServices.map(service => ({ name: service.name }))
                },
                procesos: {
                    createMany: {
                        data: processCreateMap
                    }
                }
            }
        })

        const procesosOrden = orden.procesos

        await prisma.fichaTecnica.createMany({
            data: procesosOrden.map(proc => ({ procesoId: proc.id }))
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