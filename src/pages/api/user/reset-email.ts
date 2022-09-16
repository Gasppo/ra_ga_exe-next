import { randomUUID } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { prisma } from '../../../server/db/client';
import { emailTemplate } from "../../../utils/emailTemplate";
import { generateEmailer } from "../../../utils/generateEmailer";


const fromDate = (time: number, date = Date.now()) => {
    return new Date(date + time * 1000)
}


export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "POST") {
        await handlePOST(req, res);
    } else {
        res.status(400).end(`The HTTP ${req.method} method is not supported at this route.`);
    }
}

const Email = z.object({
    email: z.string().email({ message: 'Formato de correo electrónico inválido' }),
})


// POST /api/user
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { email } = Email.parse(req.body);

        const { sendEmail } = generateEmailer({
            apiKey: process.env.MAILGUN_API_KEY,
            domain: 'gasppo.lol',
            from: 'soporte@gasppo.lol',
            fromTitle: 'Soporte HS-Taller'
        })

        const user = await prisma.user.findUnique({
            where: { email: email },
            select: { id: true, name: true, email: true }
        });

        if (!user) {
            throw 'Email incorrecto';
        }

        const token = await prisma.resetToken.create({
            data: {
                userId: user.id,
                token: randomUUID(),
                expires: fromDate(600)
            }
        })

        sendEmail({
            to: email,
            subject: 'Reseteo de contraseña - HS-Taller',
            html: emailTemplate({ name: user.name, resetToken: token.token })
        }).then(() => res.json({ message: 'Email enviado' })).catch(err => res.status(400).json({ error: err }))

    }
    catch (e) {
        if (e instanceof ZodError) {
            e.format
            res.status(400).json({ error: e.flatten() })
        }
        else {
            res.status(500).json({ error: e.message })
        }
    }
}
