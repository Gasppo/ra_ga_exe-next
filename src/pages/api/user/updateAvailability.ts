import { AvailabilityModificationSchema } from "@backend/schemas/AvailabilityModificationSchema";
import { prisma } from '@server/db/client';
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") await handlePOST(req, res);
    else {
        res.status(400).end(`The HTTP ${req.method} method is not supported at this route.`);
    }
}


async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
    try {

        const { id, available } = AvailabilityModificationSchema.parse(req.body);

        await prisma.user.update({
            where: { id },
            data: { available }
        });

        res.status(200).json({ message: 'User availability updated successfully.' });
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
}
