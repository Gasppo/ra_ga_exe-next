import { createCredentialsAccountForUser, createNewUser } from "@backend/dbcalls/user";
import { UserCreationSchema } from "@backend/schemas/UserCreationSchema";
import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";

export default async function handleUserCreation(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") await handlePOST(req, res);

    else {
        res.status(400).end(`The HTTP ${req.method} method is not supported at this route.`);
    }
}


async function handlePOST(req: NextApiRequest, res: NextApiResponse) {

    try {
        const { name, email, password } = UserCreationSchema.parse(req.body);
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
