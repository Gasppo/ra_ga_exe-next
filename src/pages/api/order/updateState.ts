import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@server/db/client';


const post = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        // find state where name is equal to req.body.newOrderState
        const stateObject = await prisma.estadoOrden.findFirst({
            where: { nombre: req.body.newOrderState }
        })


        // update estado based on request received from body
        await prisma.orden.update({
            where: { id: req.body.id },
            data: {
                estado: {
                    connect: {
                        id: stateObject.id
                    }
                }
            }
        })
        res.status(200).json({ message: 'Estado de orden actualizado' });
    } catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }
};

export default post;
