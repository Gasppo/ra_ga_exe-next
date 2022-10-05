import { Orden } from "@prisma/client";
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

export const createOrder = async (data: Partial<Orden>) => {
    return await prisma.orden.create({
        data: data
    })
}

export const findOrder = async (id: string) => {
    return await prisma.orden.findFirst({
        where: { id: id }
    })
}

export const changeOrderState = async (id: string, newOrderId: number) => {

    return await prisma.orden.update({
        include: { user: true },
        where: { id: id },
        data: {
            idEstado: newOrderId
        }
    })

}