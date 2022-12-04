import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@server/db/client';
import { ProcessUpdateSchema } from "@backend/schemas/ProcessUpdateSchema";
import { generateEmailer } from "@utils/email/generateEmailer";
import { updateProcessStateHTML } from "@utils/email/updateProcessState";

const updateProcessState = async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        const { id: processID, estado } = ProcessUpdateSchema.parse(req.body);

        const { sendEmail } = generateEmailer({
            password: process.env.MAILGUN_SMTP_PASS,
            user: 'postmaster@gasppo.lol',
            from: 'soporte@gasppo.lol',
            fromTitle: 'Soporte HS-Taller'
        })

        const proceso = await prisma.procesoDesarrolloOrden.update({
            include: { orden: { include: { user: true } }, proceso: true },
            where: { id: processID },
            data: {
                estado: {
                    connect: { descripcion: estado }
                },
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
            html: updateProcessStateHTML({ name: proceso.orden.user.name, newProcessState: estado, orderId: proceso.orden.id, processName: proceso.proceso.nombre })
        }).then(() => res.status(200).json(proceso)).catch(err => res.status(400).json({ error: err }))



    }
    catch (error) {
        res.status(500).json({ error: error })
        throw error;
    }
}

export default updateProcessState;