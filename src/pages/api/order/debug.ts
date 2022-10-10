import { calculateOrderTotal } from '@backend/dbcalls/order';
import { OrderCreationDataSchema } from '@backend/schemas/OrderCreationSchema';
import type { NextApiRequest, NextApiResponse } from "next";

const post = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const data = OrderCreationDataSchema.parse(req.body);

        const precio = await calculateOrderTotal(data)

        res.status(200).json({ price: precio });

    } catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }


}

export default post;