// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { NewClothingCategorySchema } from "@backend/schemas/NewClothingCategorySchema";
import { prisma } from '@server/db/client';


const nuevaPrenda = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const { name: categoryName, picture: pictureLink, precioBasico, precioMedio, precioComplejo, precioMuyComplejo, precioUltraComplejo, precioExtremadamenteComplejo } = NewClothingCategorySchema.parse(req.body);

        const [precioBasicoObj, precioMedioObj, precioComplejoObj, precioMuyComplejoObj, precioUltraComplejoObj, precioExtremadamenteComplejoObj] = await prisma.complejidadConfeccion.findMany({
            where: {
                OR: [
                    { name: "Básico" },
                    { name: "Medio" },
                    { name: "Complejo" },
                    { name: "Muy complejo" },
                    { name: "Ultra complejo" },
                    { name: "Extremadamente complejo" },
                ]
            },
            select: {
                id: true,
                name: true,
            }
        })

        const newClothes = await prisma.tipoPrenda.create({
            data: {
                name: categoryName,
                picture: pictureLink
            }
        })

        const newPricesForClothes = await prisma.precioPrenda.createMany({
            data: [
                {
                    precioBase: precioBasico,
                    tipoId: newClothes.id,
                    complejidadId: precioBasicoObj.id
                },
                {
                    precioBase: precioMedio,
                    tipoId: newClothes.id,
                    complejidadId: precioMedioObj.id
                },
                {
                    precioBase: precioComplejo,
                    tipoId: newClothes.id,
                    complejidadId: precioComplejoObj.id
                },
                {
                    precioBase: precioMuyComplejo,
                    tipoId: newClothes.id,
                    complejidadId: precioMuyComplejoObj.id
                },
                {
                    precioBase: precioUltraComplejo,
                    tipoId: newClothes.id,
                    complejidadId: precioUltraComplejoObj.id
                },
                {
                    precioBase: precioExtremadamenteComplejo,
                    tipoId: newClothes.id,
                    complejidadId: precioExtremadamenteComplejoObj.id
                }
            ]
        })

        res.status(200).json([newClothes, newPricesForClothes])
    }

    catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }

};

export default nuevaPrenda;