import type { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import { createCredentialsAccountForUser, createNewUser } from "../../../utils/dbcalls/user";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") await handlePOST(req, res);

    else {
        res.status(400).end(`The HTTP ${req.method} method is not supported at this route.`);
    }
}


const minCharErrorMessage = (min: number) => `Se requiere un mínimo de ${min} ${min === 1 ? "caracter" : "caracteres"}`;
const maxCharErrorMessage = (max: number) => `Se tiene un máximo de ${max} ${max === 1 ? "caracter" : "caracteres"}`;
export const emailErrorMessage = () => `Formato de correo electrónico inválido`;

export const UserSchema = z.object({
    name: z.string().min(1, { message: minCharErrorMessage(1) }).max(50, { message: maxCharErrorMessage(50) }),
    email: z.string().email({ message: emailErrorMessage() }),
    password: z.string().min(8, { message: minCharErrorMessage(8) }).max(50, { message: maxCharErrorMessage(50) }),
    confirmPassword: z.string().min(8, { message: minCharErrorMessage(8) }).max(50, { message: maxCharErrorMessage(50) }),
}).refine(data => data.password === data.confirmPassword, "Las contraseñas deben ser iguales");



async function handlePOST(req: NextApiRequest, res: NextApiResponse) {

    try {
        const { name, email, password } = UserSchema.parse(req.body);
        const user = await createNewUser({ name, email, password });

        await createCredentialsAccountForUser(user.id);

        res.status(200).json({
            statusCode: 200,
            body: {
                user: {
                    name: user.name,
                    email: user.email,
                    image: user.image,
                }
            }
        })
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
