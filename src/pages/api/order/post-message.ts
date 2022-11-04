import { OrderMessageSchema } from "@backend/schemas/OrderMessageSchema";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@server/db/client';


const postMessage = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const body = OrderMessageSchema.parse(req.body);

        const message = await prisma.mensaje.create({
            data: {
                mensaje: body.message,
                orden: { connect: { id: body.orderId } },
                user: { connect: { email: body.userEmail } },
            }
        })

        res.status(200).json(message);
    }
    catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }
}

export default postMessage;