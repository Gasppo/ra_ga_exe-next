import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@server/db/client';


const post = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
            select: {
                name: true,
                email: true,
                image: true,
                telefono: true
            }
        });
        res.status(200).json(user);
    }catch(error) {
        res.status(500).json({ error: error })
        throw error;
    }
}

export default post;