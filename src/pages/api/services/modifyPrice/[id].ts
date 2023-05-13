// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@server/db/client';


const modifyServicePrice = async (req: NextApiRequest, res: NextApiResponse) => {

    const { id } = req.query;
    const { precioBase, factorMultiplicador } = req.body;

    const serviceId = Array.isArray(id) ? id[0] : id;

    try {
        const precioDelDolar = await prisma.precioDelDolar.findUnique({ where: { id: serviceId } })
        const service = await prisma.servicio.findUnique({ where: { id: serviceId } })

        if (precioDelDolar) {
            const reply = await prisma.precioDelDolar.update({
                where: {
                    id: serviceId
                },
                data: {
                    precio: precioBase
                }
            })
            res.status(200).json(reply)
        } else if (service) {
            const reply = await prisma.servicio.update({
                where: {
                    id: serviceId
                },
                data: {
                    factorMultiplicador: factorMultiplicador,
                    precioFijo: precioBase
                }
            })
            res.status(200).json(reply)
        } else {
            res.status(404).json({ error: 'No se encontró el servicio' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }
};

export default modifyServicePrice;
