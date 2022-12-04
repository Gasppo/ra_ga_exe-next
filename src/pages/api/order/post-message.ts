import { OrderMessageSchema } from "@backend/schemas/OrderMessageSchema";
import { prisma } from '@server/db/client';
import { generateEmailer } from "@utils/email/generateEmailer";
import { newOrderMessage } from "@utils/email/newOrderMessage";
import { NextApiRequest, NextApiResponse } from "next";


const postMessage = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const body = OrderMessageSchema.parse(req.body);

        const { sendEmail } = generateEmailer({
            password: process.env.MAILGUN_SMTP_PASS,
            user: 'postmaster@gasppo.lol',
            from: 'soporte@gasppo.lol',
            fromTitle: 'Soporte HS-Taller'
        })

        const message = await prisma.mensaje.create({
            include: { orden: { include: { user: true } }, user: true },
            data: {
                mensaje: body.message,
                orden: { connect: { id: body.orderId } },
                user: { connect: { email: body.userEmail } },
                seccion: body.section
            }
        })
        if (message.user.email !== message.orden.user.email) {
            sendEmail({
                to: message.orden.user.email,
                subject: 'Modificación pedido orden - HS-Taller',
                html: newOrderMessage({ receiver: message.orden.user.name, orderId: body.orderId, sender: message.user.name })
            }).then(() => res.json({ mensaje: message.mensaje, from: message.user.email, createdAt: message.createdAt })).catch(err => { throw err })
        } else {
            res.status(200).json({ mensaje: message.mensaje, from: message.user.email, createdAt: message.createdAt })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }
}

export default postMessage;