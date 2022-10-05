import { checkIfUserExists, clearUserTokens, createCredentialsAccountForUser, hashPassword, updateUserByID, verifyToken } from "@backend/dbcalls/user";
import { PasswordUpdateSchema } from "@backend/schemas/PasswordUpdateSchema";
import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        await handlePOST(req, res);
    } else {
        res.status(400).end(`The HTTP ${req.method} method is not supported at this route.`);
    }
}


async function handlePOST(req: NextApiRequest, res: NextApiResponse) {

    try {
        const data = PasswordUpdateSchema.parse(req.body);
        const password = hashPassword(data.password);
        const userToken = await verifyToken(data.token);
        const existingUser = await checkIfUserExists({ id: userToken.userId });

        if (!existingUser) throw "El usuario no existe"
        if (!existingUser.password) await createCredentialsAccountForUser(existingUser.id)


        const user = await updateUserByID(userToken.userId, { password: password });

        if (user) await clearUserTokens(userToken.userId);

        res.status(200).json({
            statusCode: 200,
            message: 'Contraseña actualizada correctamente para usuario ' + user.name,
        })
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
