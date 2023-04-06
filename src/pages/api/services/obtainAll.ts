import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@server/db/client';


const post = async (req: NextApiRequest, res: NextApiResponse) => {

    // obtain all services
    const services = await prisma.servicio.findMany({});
    const precioDelDolar = await prisma.precioDelDolar.findMany({})

    const nuevoPrecioDelDolar = {
        id: precioDelDolar[0].id,
        name: 'Precio del Dolar',
        description: 'Precio del Dolar',
        factorMultiplicador: 0,
        precioFijo: precioDelDolar[0].precio,
    }

    // put precio del dolar in the first position
    services.unshift(nuevoPrecioDelDolar)

    if (!services) {
        res.status(500).json({ error: "No services found" });
        return;
    } else {
        res.status(200).json(services);
    }

};

export default post;
