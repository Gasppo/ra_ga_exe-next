import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@server/db/client';


const post = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const user = await prisma.user.findUnique({
            where: { email: req.body.email },
            select: { available: true }
        })
        res.status(200).json({ available: user.available });
    } catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }
};

export default post;