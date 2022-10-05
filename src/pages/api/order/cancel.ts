import { changeOrderState } from "@backend/dbcalls/order";
import { OrderStateUpdateSchema } from "@backend/schemas/OrderStateUpdateSchema";
import type { NextApiRequest, NextApiResponse } from "next";


const post = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const { newStateId, id: orderId } = OrderStateUpdateSchema.parse(req.body);

        await changeOrderState(orderId, newStateId);

        res.status(200).json({ message: 'Estado de orden actualizado' });
    } catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }
};

export default post;
