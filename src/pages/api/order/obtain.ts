import { prisma } from '@server/db/client';
import type { NextApiRequest, NextApiResponse } from "next";


const post = async (req: NextApiRequest, res: NextApiResponse) => {

    //const { id } = req.query;

    try {
        const orders = await prisma.orden.findUnique({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    }
                },
                estado: true,
                // bring image inside category inside prenda
                prenda: {
                    include: {
                        tipo: true,
                        complejidad: true,
                    }
                },
                archivos: true,
                cotizacionOrden: {
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
            },
            where: { id: req.body.orderId }
        })
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }
};

export default post;
