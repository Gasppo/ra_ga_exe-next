import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@server/db/client';

const post = async (req: NextApiRequest, res: NextApiResponse) => {

    try {

        //const { name, email, id, userId, createdAt, updatedAt, telefono, whatsapp, marca, direccionFacturacion, direccionEnvio, ciudad } = UserInfoUpdateSchema.parse(req.body);
        // under development :)


    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }

};

export default post;