import { checkIfUserExists, createResetToken } from "@backend/dbcalls/user";
import { SendResetEmailSchema } from "@backend/schemas/SendResetEmailSchema";
import { emailTemplate } from "@utils/email/emailTemplate";
import { generateEmailer } from "@utils/email/generateEmailer";
import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";



export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") await handlePOST(req, res);
    else {
        res.status(400).end(`The HTTP ${req.method} method is not supported at this route.`);
    }
}


async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { email } = SendResetEmailSchema.parse(req.body);

        const { sendEmail } = generateEmailer({
            password: process.env.MAILGUN_SMTP_PASS,
            user: 'postmaster@gasppo.lol',
            from: 'soporte@gasppo.lol',
            fromTitle: 'Soporte HS-Taller'
        })

        const user = await checkIfUserExists({ email: email });

        if (!user) throw 'Error al enviar el correo';

        const token = await createResetToken(user.id);
        
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
            res.status(500).json({ error: e })
        }
    }
}
