// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@server/db/client';


const getComplexitiesByClothesID = async (req: NextApiRequest, res: NextApiResponse) => {

    try {

        const idPrenda = req.query.idPrenda as string

        const complexities = await prisma.complejidadConfeccion.findMany({
            where: {
                id: {
                    in: (await prisma.precioPrenda.findMany({ where: { tipoId: idPrenda }, select: { complejidadId: true } })).map(el => el.complejidadId)
                }
            }
        })

        res.status(200).json(complexities);
    }
    catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }
};

export default getComplexitiesByClothesID;
