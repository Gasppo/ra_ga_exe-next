import { OrderFieldsUpdateSchema } from "@backend/schemas/OrderFieldsUpdateSchema";
import { prisma } from '@server/db/client';
import { NextApiRequest, NextApiResponse } from "next";

const updateOrderFields = async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        const { orderId, precioPrendaId } = OrderFieldsUpdateSchema.parse(req.body);

        const orden = await prisma.orden.update({
            where: { id: orderId },
            data: { prenda: { connect: { id: precioPrendaId } } },
        })

        res.status(200).json(orden);

    }
    catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }
}

export default updateOrderFields;