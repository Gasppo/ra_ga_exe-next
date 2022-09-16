import type { NextApiRequest, NextApiResponse } from "next";
import sha256 from "crypto-js/sha256";
import { prisma } from "../../../server/db/client";
import { z, ZodError } from "zod";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "POST") {
        await handlePOST(req, res);
    } else {
        res.status(400).end(`The HTTP ${req.method} method is not supported at this route.`);
    }
}

const hashPassword = (password: string) => {
    return sha256(password).toString();
};


const minCharErrorMessage = (min: number) => `Se requiere un mínimo de ${min} ${min === 1 ? "caracter" : "caracteres"}`;
const maxCharErrorMessage = (max: number) => `Se tiene un máximo de ${max} ${max === 1 ? "caracter" : "caracteres"}`;

const Password = z.object({
    token: z.string(),
    password: z.string().min(8, { message: minCharErrorMessage(8) }).max(50, { message: maxCharErrorMessage(50) }),
    confirmPassword: z.string().min(8, { message: minCharErrorMessage(8) }).max(50, { message: maxCharErrorMessage(50) }),
}).refine(data => data.password === data.confirmPassword, "Las contraseñas deben ser iguales");


const checkIfUserExists = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });
    if (user && !user.password) {
        await prisma.account.create({
            data: {
                userId: user.id,
                type: "credentials",
                provider: "credentials",
                providerAccountId: user.id,
            },
        })
    }
    return !!user;
}


const verifyToken = async (token: string) => {
    await deleteExpiredTokens();
    const user = await prisma.resetToken.findFirst({
        where: {
            token: token,
            expires: { gt: new Date() },
        },
        select: {
            userId: true,
        }
    });
    if (!user) throw "El token no es válido o ha expirado"
    return user;
}


const deleteExpiredTokens = async () => {
    await prisma.resetToken.deleteMany({
        where: {
            expires: { lt: new Date() },
        },
    });
}

const clearUserTokens = async (userId: string) => {
    await prisma.resetToken.deleteMany({
        where: {
            userId: userId,
        },
    });
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {

    try {
        const data = Password.parse(req.body);
        const password = hashPassword(data.password);
        const userToken = await verifyToken(data.token);
        const exists = await checkIfUserExists(userToken.userId);

        if (!exists) {
            throw "El usuario no existe"
        }

        const user = await prisma.user.update({
            where: {
                id: userToken.userId,
            },
            data: {
                password: password,
            }
        });

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
