import type { NextApiRequest, NextApiResponse } from "next";
import sha256 from "crypto-js/sha256";
import { prisma } from "../../../server/db/client";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "POST") {
        await handlePOST(req, res);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}

const hashPassword = (password: string) => {
    return sha256(password).toString();
};

// POST /api/user
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
    const user = await prisma.user.create({
        data: { ...req.body, password: hashPassword(req.body.password) },
    });

    const account = await prisma.account.create({
        data: {
            userId: user.id,
            type: "credentials",
            provider: "credentials",
            providerAccountId: user.id,
        },
    })

    if (account && user) res.json(user);
    res.status(400).end("Unable to create user");
}
