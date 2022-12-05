import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@server/db/client';
import { generateEmailer } from "@utils/email/generateEmailer";
import { updateProcessResourcesHTML } from "@utils/email/updateProcessResources";
import { ProcessUpdateResourcesSchema } from "@backend/schemas/ProcessUpdateResourcesSchema";

const updateProcessResources = async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        const { id: processID, recursos } = ProcessUpdateResourcesSchema.parse(req.body);

        const { sendEmail } = generateEmailer({
            password: process.env.MAILGUN_SMTP_PASS,
            user: 'postmaster@gasppo.lol',
            from: 'soporte@gasppo.lol',
            fromTitle: 'Soporte HS-Taller'
        })

        const userEmails = recursos.map(el => el.key)

        const users = await prisma.user.findMany({ where: { email: { in: userEmails } } })

        const proceso = await prisma.procesoDesarrolloOrden.update({
            include: { orden: { include: { user: true } }, proceso: true },
            where: { id: processID },
            data: {
                usuarioDeServicio: { connect: users.map(el => ({ email: el.email })) },
                FichaTecnica: {
                    update: {
                        updatedAt: new Date()
                    }
                }

            }
        })


        sendEmail({
            to: proceso.orden.user.email,
            subject: 'Modificación pedido orden - HS-Taller',
            html: updateProcessResourcesHTML({ name: proceso.orden.user.name, orderId: proceso.orden.id, processName: proceso.proceso.nombre })
        }).then(() => res.status(200).json(proceso)).catch(err => res.status(400).json({ error: err }))



    }
    catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }
}

export default updateProcessResources;