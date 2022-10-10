import { ValidatedOrderSchema } from "@backend/schemas/OrderCreationSchema";
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

export const getPrecioDolar = async () => {
    return await prisma.precioDelDolar.findFirst({
        where: {
            fechaDesde: {
                lte: new Date()
            },
            fechaHasta: {
                gte: new Date()
            }
        },
        orderBy: {
            fechaDesde: "desc"
        }
    })
}

export const findPrendaPrecioByTypeAndComplexity = async (tipoId: string, complejidadId: string) => {
    return await prisma.precioPrenda.findFirst({
        include: {
            tipo: true,
            complejidad: true
        },
        where: {
            complejidadId: complejidadId,
            tipoId: tipoId
        }
    })
}

// export const getServicesFromOrderData = async (data: OrderCreationData) => {

// }

export const calculateOrderTotal = async (orderData: ValidatedOrderSchema, complexityId: string) => {

    const precioDolar = await getPrecioDolar()

    const prendaPrecio = await findPrendaPrecioByTypeAndComplexity(orderData.tipoPrenda.id, complexityId);

    const services = await prisma.servicio.findMany({})

    const servicesPrices = services.reduce<{ [key: string]: { precioFijo: number, factorMultiplicador: number } }>((acc, service) => {
        acc[service.name] = { precioFijo: service.precioFijo, factorMultiplicador: service.factorMultiplicador }
        return acc
    }, {})

    const factores = Object.keys(orderData).reduce((prev, key) => {
        if (key in servicesPrices) {
            if (orderData[key]?.selected) {
                prev.factorMultiplicador += servicesPrices[key].factorMultiplicador
                prev.precioFijo += servicesPrices[key].precioFijo
            }
        }
        return prev
    }, { precioFijo: 0, factorMultiplicador: 0 })


    return (precioDolar?.precio * (prendaPrecio.precioBase * factores.factorMultiplicador + factores.precioFijo))
}