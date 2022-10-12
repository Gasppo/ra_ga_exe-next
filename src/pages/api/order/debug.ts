import { calculateOrderTotal } from '@backend/dbcalls/order';
import { OrderCreationDataSchema } from '@backend/schemas/OrderCreationSchema';
import type { NextApiRequest, NextApiResponse } from "next";

const post = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id: debugComplejidadID } = await prisma.complejidadConfeccion.findFirst({ where: { name: 'Básico' } })

    try {
        const data = OrderCreationDataSchema.parse(req.body);

        const precio = await calculateOrderTotal(data, debugComplejidadID)

        res.status(200).json({ price: precio });

    } catch (error) {
        res.status(500).json({ error: error })
    }


}

export default post;