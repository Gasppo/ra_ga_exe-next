import { changeOrderState } from "@backend/dbcalls/order";
import { OrderStateUpdateSchema } from "@backend/schemas/OrderStateUpdateSchema";
import { generateEmailer } from "@utils/email/generateEmailer";
import { updateOrderStateHTML } from "@utils/email/updateOrderState";
import type { NextApiRequest, NextApiResponse } from "next";


const post = async (req: NextApiRequest, res: NextApiResponse) => {

    try {

        const { newStateId, id: orderId } = OrderStateUpdateSchema.parse(req.body);

        const orden = await changeOrderState(orderId, newStateId)

        // send email
        const { sendEmail } = generateEmailer({
            password: process.env.MAILGUN_SMTP_PASS,
            user: 'postmaster@gasppo.lol',
            from: 'soporte@gasppo.lol',
            fromTitle: 'Soporte HS-Taller'
        })

        sendEmail({
            to: orden.user.email,
            subject: 'Modificación pedido orden - HS-Taller',
            html: updateOrderStateHTML({ name: orden.user.name, orderId, newOrderState: newStateId })
        }).then(() => res.json({ message: 'Email enviado' })).catch(err => res.status(400).json({ error: err }))

        res.status(200).json({ message: 'Estado de orden actualizado' });
    } catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }
};

export default post;
