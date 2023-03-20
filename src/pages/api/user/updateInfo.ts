import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@server/db/client';
import { UserInfoUpdateSchema } from "@backend/schemas/UserInfoUpdateSchema";
import { User, UserPersonalData } from "@prisma/client";

const post = async (req: NextApiRequest, res: NextApiResponse) => {

    try {

        const { 
            name, 
            telefono, 
            whatsapp, 
            marca, 
            direccionFacturacion, 
            direccionEnvio, 
            ciudad 
        } = UserInfoUpdateSchema.parse(req.body);

        const { id, userId } = req.body;

        const userNameEdit:User = await prisma.user.update({
            where: { id: userId },
            data: {
                name,
            }
        })

        const userInfo:UserPersonalData = await prisma.userPersonalData.update({
            where: { id },
            data: {
                telefono,
                whatsapp,
                marca,
                direccionFacturacion,
                direccionEnvio,
                ciudad,
                updatedAt: new Date()
            }
        });



        // only show the name of the user in the response
        res.status(200).json({ user: { name: userNameEdit.name }, userInfo });


    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }

};

export default post;