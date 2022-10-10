import { calculateOrderTotal, findPrendaPrecioByTypeAndComplexity, updateExpiredOrders } from '@backend/dbcalls/order';
import { OrderCreationDataSchema } from '@backend/schemas/OrderCreationSchema';
import { prisma } from '@server/db/client';
import { generateEmailer } from '@utils/email/generateEmailer';
import { newOrderNotificationHTML } from '@utils/email/newOrderNotification';
import { checkIfUserExists, fromToday } from 'backend/dbcalls/user';
import type { NextApiRequest, NextApiResponse } from "next";

const post = async (req: NextApiRequest, res: NextApiResponse) => {

    const debugComplejidadID = 'cl90cx1ak0119pnvh8o2yp3pm'


    try {
        const data = OrderCreationDataSchema.parse(req.body);

        const { sendEmail } = generateEmailer({
            password: process.env.MAILGUN_SMTP_PASS,
            user: 'postmaster@gasppo.lol',
            from: 'soporte@gasppo.lol',
            fromTitle: 'Soporte HS-Taller'
        })

        await updateExpiredOrders();

        const prendaPrecio = await findPrendaPrecioByTypeAndComplexity(data.tipoPrenda.id, debugComplejidadID);
        const precio = await calculateOrderTotal(data, debugComplejidadID)

        console.log(prendaPrecio)

        const user = await checkIfUserExists({ email: data.user.email })


        const orden = await prisma.orden.create({
            data: {
                nombre: `${prendaPrecio.tipo.name} ${prendaPrecio.complejidad.name}`,
                cantidad: 100,
                expiresAt: fromToday(60 * 60 * 24 * 15),
                estado: {
                    connect: { id: 1 }
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
                            ...data.molderiaBase.files.map(file => ({ name: file.name || '', urlID: file.urlID || '', type: 'molderiaBase' })),
                            ...data.geometral.files.map(file => ({ name: file.name || '', urlID: file.urlID || '', type: 'geometral' })),
                            ...data.logoMarca.files.map(file => ({ name: file.name || '', urlID: file.urlID || '', type: 'logoMarca' })),
                        ]
                    }
                },
                cotizacionOrden: {
                    create: {
                        precio: precio,
                    }
                }
            }
        })

        await sendEmail({
            html: newOrderNotificationHTML({ name: user.name, orderId: orden.id }),
            to: user.email,
            subject: 'Orden creada'
        })

        res.status(200).json({ message: 'Orden creada con éxito' });

    } catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }


}

export default post;