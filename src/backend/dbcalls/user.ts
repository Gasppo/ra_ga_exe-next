import { prisma } from "../../server/db/client";
import sha256 from "crypto-js/sha256";
import { User } from "@prisma/client";
import { randomUUID } from "crypto";
import { adminRole, ayudanteRole } from "@utils/roles/SiteRoles";



export const fromToday = (time: number, date = Date.now()) => {
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
            expires: fromToday(600)
        }
    })
}


export const createNewUser = async (data: { name: string, email: string, password: string , isServiceProvider:boolean }) => {
    const password = hashPassword(data.password);
    return await prisma.user.create({
        data: {
            email: data.email,
            name: data.name,
            password: password,
            roleId: data.isServiceProvider ? 4 : 1
        }
    });
}


export const obtainRole = async (email: string) => {
    return await prisma.user.findUnique({
        where: { email: email },
        select: { role: true }
    })
}

export const verifyUserProfile = async (userId: string | string[], userEmail: string) => {

    const id = Array.isArray(userId) ? userId[0] : userId;
    const user = await prisma.user.findFirst({
        where: { id: id }
    })


    //TODO: Check if user is admin
    if (user?.email === userEmail) return true

    const role = await prisma.user.findUnique({
        where: { email: userEmail },
        select: { role: true }
    })

    if (role?.role.name === adminRole || role?.role.name === ayudanteRole) return true

    return false

}
