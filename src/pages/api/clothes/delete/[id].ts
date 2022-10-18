// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@server/db/client';


const del = async (req: NextApiRequest, res: NextApiResponse) => {

    const { id } = req.query;

    const clothesId = Array.isArray(id) ? id[0] : id;

    try {
        /* delete the clothing based on id and all the prices attached to it */
        const deletedClothing = await prisma.tipoPrenda.delete({
            where: {
                id: clothesId
            },
            select: {
                id: true,
                name: true,
                picture: true,
                precios: {
                    select: {
                        precioBase: true,
                        complejidad: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })
        res.status(200).json(deletedClothing);
    }
    catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }
};

export default del;
