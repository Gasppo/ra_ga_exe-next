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
    if (order?.user.email === userEmail) return true

    const role = await prisma.user.findUnique({
        where: { email: userEmail },
        select: { role: true }
    })

    return role?.role.name === "Dueño" || role?.role.name === "Administrador"
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
    try {
        const precioDolar = await getPrecioDolar()
        await prisma.servicio.findMany({ where: { name: { in: Object.keys(orderData) } } })

        const preciosIndividuales = []
        const prendaPrecio = await findPrendaPrecioByTypeAndComplexity(orderData.tipoPrenda.id, complexityId);
        console.log('prendaPrecio', prendaPrecio)

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
                    console.log(`${key} - Adding ${servicesPrices[key].factorMultiplicador} to factorMultiplicador and ${servicesPrices[key].precioFijo} to precioFijo`)
                    prev.servicios[key] = { precioFijo: servicesPrices[key].precioFijo, factorMultiplicador: servicesPrices[key].factorMultiplicador }
                    preciosIndividuales.push({
                        servicio: key,
                        precioTotal: precioDolar?.precio * (prendaPrecio.precioBase * servicesPrices[key].factorMultiplicador + servicesPrices[key].precioFijo)
                    })
                }
            }
            return prev
        }, { precioFijo: 0, factorMultiplicador: 0, servicios: {} })
        return { precioTotal: (precioDolar?.precio * (prendaPrecio.precioBase * factores.factorMultiplicador + factores.precioFijo)), preciosIndividuales, precioDolar }
    }
    catch (e) {
        console.error(e)
    }
}


export const getAtributosPrenda = async (orderData: ValidatedOrderSchema) => {

    const atributos = Object.keys(orderData.atributosPrenda).filter(key => orderData.atributosPrenda[key]?.selected === true).map(key => {
        return {
            name: key,
            observaciones: orderData.atributosPrenda[key]?.observaciones as string || '',
            cantidad: orderData.atributosPrenda[key]?.cantidad as number || 0
        }
    })

    return atributos

}