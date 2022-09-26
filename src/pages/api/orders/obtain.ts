// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()


const examples = async (req: NextApiRequest, res: NextApiResponse) => {
    
    try {
        const orders = await prisma.orden.findMany({
            include: { user: true, estado: true },
            where: { user: { email: req.body.email }}
        })
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }

};

export default examples;
