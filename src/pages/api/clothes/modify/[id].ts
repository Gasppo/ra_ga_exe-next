// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@server/db/client';
import { NewClothingCategorySchema } from "@backend/schemas/NewClothingCategorySchema";


const del = async (req: NextApiRequest, res: NextApiResponse) => {

    const { id } = req.query;
    const { name: categoryName, picture: pictureLink, precioBasico, precioMedio, precioComplejo, precioMuyComplejo, precioUltraComplejo, precioExtremadamenteComplejo } = NewClothingCategorySchema.parse(req.body);

    const clothesId = Array.isArray(id) ? id[0] : id;

    try {

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

        await prisma.precioPrenda.updateMany({
            where: {
                tipoId: clothesId,
                complejidadId: precioBasicoObj.id
            },
            data: {
                precioBase: precioBasico
            }
        })

        await prisma.precioPrenda.updateMany({
            where: {
                tipoId: clothesId,
                complejidadId: precioMedioObj.id
            },
            data: {
                precioBase: precioMedio
            }
        })

        await prisma.precioPrenda.updateMany({
            where: {
                tipoId: clothesId,
                complejidadId: precioComplejoObj.id
            },
            data: {
                precioBase: precioComplejo
            }
        })

        await prisma.precioPrenda.updateMany({
            where: {
                tipoId: clothesId,
                complejidadId: precioMuyComplejoObj.id
            },
            data: {
                precioBase: precioMuyComplejo
            }
        })

        await prisma.precioPrenda.updateMany({
            where: {
                tipoId: clothesId,
                complejidadId: precioUltraComplejoObj.id
            },
            data: {
                precioBase: precioUltraComplejo
            }
        })

        await prisma.precioPrenda.updateMany({
            where: {
                tipoId: clothesId,
                complejidadId: precioExtremadamenteComplejoObj.id
            },
            data: {
                precioBase: precioExtremadamenteComplejo
            }
        })

        const updatedClothing = await prisma.tipoPrenda.update({
            include: {
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
            },
            where: {
                id: clothesId
            },
            data: {
                name: categoryName,
                picture: pictureLink,
            }
        })



        res.status(200).json(updatedClothing);


    }
    catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }
};

export default del;
