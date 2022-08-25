import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();


const role = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id }: { id?: string } = req.query;

    const user = await prisma.user.findFirst({
        where: { id: id },
        include: { role: true }
    });
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.status(200).json(user.role?.name || "User has no role");
}

export default role;