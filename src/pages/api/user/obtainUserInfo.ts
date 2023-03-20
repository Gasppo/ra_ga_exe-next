import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@server/db/client';


const post = async (req: NextApiRequest, res: NextApiResponse) => {

    try {

        const user = await prisma.user.findUnique({ where: { id: req.body.id }, select: { id: true, name: true, email: true } })

        const userData = await prisma.userPersonalData.findUnique({ where: { userId: user.id } }) 
        if (!userData) {
            await prisma.userPersonalData.create({ data: { 
                userId: user.id, 
                ciudad: '', 
                direccionEnvio: '', 
                direccionFacturacion: '',
                marca: '',
                createdAt: new Date(),
                updatedAt: new Date(),
                telefono: 0,
                whatsapp: 0
            }})
        }

        const userInfo = { name: user.name, email: user.email, ...userData }

        res.status(200).json(userInfo)
    } catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }
};

export default post;