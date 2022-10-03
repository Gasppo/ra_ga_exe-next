import { findOrder } from "@backend/dbcalls/order";
import type { NextApiRequest, NextApiResponse } from "next";


const post = async (req: NextApiRequest, res: NextApiResponse) => {

    const { id } = req.query;

    try {
        const orders = await findOrder(id as string);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }
};

export default post;
