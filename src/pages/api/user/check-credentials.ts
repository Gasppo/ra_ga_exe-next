import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import sha256 from "crypto-js/sha256";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    console.log(req.body)
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
    const user = await prisma.user.findFirst({
        where: { email: req.body.username },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            password: true,
        },
    });
    if (user && user.password == hashPassword(req.body.password)) {
        res.json(user);
    } else {
        res.status(400).end("Invalid credentials");
    }
}
