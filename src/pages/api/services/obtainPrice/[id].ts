// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@server/db/client';


const obtainServicePrice = async (req: NextApiRequest, res: NextApiResponse) => {

    const { id } = req.query;

    const serviceId = Array.isArray(id) ? id[0] : id;

    try {
        const precioDelDolar = await prisma.precioDelDolar.findUnique({ where: { id: serviceId } })
        const service = await prisma.servicio.findUnique({ where: { id: serviceId } })

        const reply = precioDelDolar ? { ...precioDelDolar, precioBase: precioDelDolar.precio, name: 'Precio del Dolar' } : { ...service, precioBase: service.factorMultiplicador }

        res.status(200).json(reply);

    }
    catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }
};

export default obtainServicePrice;
