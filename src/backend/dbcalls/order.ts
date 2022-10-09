import { Prisma } from "@prisma/client";
import { prisma } from "@server/db/client";

export const updateExpiredOrders = async () => {
    await prisma.orden.updateMany({
        where: {
            expiresAt: { lt: new Date() },
        },
        data: {
            idEstado: 7,
        }
    });
}

export const createOrder = async (data: Prisma.OrdenCreateInput) => {
    return await prisma.orden.create({
        data: data,
    })
}

export const findOrder = async (id: string) => {
    return await prisma.orden.findFirst({
        where: { id: id }
    })
}

export const changeOrderState = async (id: string, newOrderId: number) => {

    return await prisma.orden.update({
        include: { user: true, estado: true },
        where: { id: id },
        data: {
            idEstado: newOrderId
        }
    })

}


export const verifyUserOrder = async (orderId: string | string[], userEmail: string) => {
    const id = Array.isArray(orderId) ? orderId[0] : orderId;
    const order = await prisma.orden.findFirst({
        where: {
            id: id,
        },
        include: {
            user: true
        }
    })

    //TODO: Check if user is admin
    return order?.user.email === userEmail || userEmail === 'garciagb24@gmail.com'
}