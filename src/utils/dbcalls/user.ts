import { prisma } from "../../server/db/client";
import sha256 from "crypto-js/sha256";
import { User } from "@prisma/client";
import { randomUUID } from "crypto";



const fromDate = (time: number, date = Date.now()) => {
    return new Date(date + time * 1000)
}


export const verifyToken = async (token: string) => {
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


export const deleteExpiredTokens = async () => {
    await prisma.resetToken.deleteMany({
        where: {
            expires: { lt: new Date() },
        },
    });
}


export const createCredentialsAccountForUser = async (userID: string) => {
    await prisma.account.create({
        data: {
            userId: userID,
            type: "credentials",
            provider: "credentials",
            providerAccountId: userID,
        },
    })
}


export const checkIfUserExists = async (search: { email?: string, id?: string }) => {
    const user = await prisma.user.findUnique({
        where: {
            ...search
        },
    });

    return user;
}


export const clearUserTokens = async (userId: string) => {
    await prisma.resetToken.deleteMany({
        where: {
            userId: userId,
        },
    });
}


export const hashPassword = (password: string) => {
    return sha256(password).toString();
};


export const updateUserByID = async (id: string, data: Partial<User>) => {

    return await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            ...data
        }
    });

}


export const createResetToken = async (userId: string) => {
    return await prisma.resetToken.create({
        data: {
            userId: userId,
            token: randomUUID(),
            expires: fromDate(600)
        }
    })
}


export const createNewUser = async (data: { name: string, email: string, password: string }) => {
    const password = hashPassword(data.password);
    return await prisma.user.create({
        data: {
            email: data.email,
            name: data.name,
            password: password,
        }
    });
}