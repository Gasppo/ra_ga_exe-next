import { RoleModificationSchema } from "@backend/schemas/RoleModificationSchema";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") await handlePOST(req, res);
    else {
        res.status(400).end(`The HTTP ${req.method} method is not supported at this route.`);
    }
}


async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
    try {

        const { id, role } = RoleModificationSchema.parse(req.body);

        await prisma.user.update({
            where: {
                id: id
            },
            data: {
                role: {
                    connect: {
                        name: role
                    }
                }
            }
        })

        res.status(200).json({ message: 'Rol actualizado' });
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
}
