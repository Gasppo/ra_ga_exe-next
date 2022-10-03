import { CredentialCheckSchema } from "@backend/schemas/CredentialCheckSchema";
import type { NextApiRequest, NextApiResponse } from "next";
import { checkIfUserExists, hashPassword } from "../../../backend/dbcalls/user";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") await handlePOST(req, res);
    else {
        res.status(400).end(`The HTTP ${req.method} method is not supported at this route.`);
    }
}


async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { username, password } = CredentialCheckSchema.parse(req.body);
        if (!username || !password) throw "Ingresar usuario y contraseña";

        const user = await checkIfUserExists({ email: username });
        console.log(user.password, hashPassword(req.body.password))

        if (!user || user.password !== hashPassword(req.body.password)) throw 'Credenciales incorrectas';

        res.json(user);
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
}
