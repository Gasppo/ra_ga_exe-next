import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const post = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const orders = await prisma.orden.findUnique({
            where: { id: req.body.orderId }
        })
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }
};

export default post;
