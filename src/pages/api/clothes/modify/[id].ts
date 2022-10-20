// src/pages/api/examples.ts
import { ModifyClothingCategorySchema } from "@backend/schemas/ModifyClothingCategorySchema";
import { prisma } from '@server/db/client';
import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";


const del = async (req: NextApiRequest, res: NextApiResponse) => {

    const { id } = req.query;

    const clothesId = Array.isArray(id) ? id[0] : id;

    try {

        const { name: categoryName, picture: pictureLink, } = ModifyClothingCategorySchema.parse(req.body);

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
        if (error instanceof ZodError) {
            error.format
            res.status(400).json({ error: error.flatten() })
        }
        else {
            res.status(400).json({ error: error })
        }
    }
};

export default del;
