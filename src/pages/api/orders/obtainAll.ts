import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@server/db/client';


const obtainAllOrders = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const orders = await prisma.orden.findMany({
            select: {
                id: true,
                nombre: true,
                cantidad: true,
                estado: {
                    select: {
                        nombre: true
                    }
                },
                createdAt: true,
                user: {
                    select: { name: true }
                }
            }
        })
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }
};

export default obtainAllOrders;
