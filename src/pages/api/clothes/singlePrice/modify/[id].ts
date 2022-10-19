// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@server/db/client';


const get = async (req: NextApiRequest, res: NextApiResponse) => {

    const { id } = req.query;

    const priceId = Array.isArray(id) ? id[0] : id;

    try {
        const clothes = await prisma.precioPrenda.update({
            where: {
                id: priceId
            },
            data: {
                precioBase: req.body.precioBase
            },
            select: {
                id: true,
                precioBase: true,
            }
        })
        res.status(200).json(clothes);
    }
    catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }
};

export default get;
