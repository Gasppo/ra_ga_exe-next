import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const teardown = async () => {
    //Delete everything created
    const deleteServices = prisma.servicio.deleteMany({})
    const deletePrendas = prisma.atributoPrenda.deleteMany({})
    const deleteDetalles = prisma.detallesPrenda.deleteMany({})
    const deleteOrdenes = prisma.orden.deleteMany({})
    const deleteTipoPrenda = prisma.tipoPrenda.deleteMany({})
    const deleteEstadoOrden = prisma.estadoOrden.deleteMany({})
    const deletePrecioDolar = prisma.precioDelDolar.deleteMany({})
    const deleteComplejidad = prisma.complejidadConfeccion.deleteMany({})
    const deletePrecioPrenda = prisma.precioPrenda.deleteMany({})
    const deleteUser = prisma.user.deleteMany({})
    const deleteCotizacionOrden = prisma.cotizacionOrden.deleteMany({})
    const deleteArchivos = prisma.archivo.deleteMany({})
    const deleteProcesos = prisma.procesoDesarrolloOrden.deleteMany({})

    await prisma.$transaction([
        deleteServices,
        deletePrendas,
        deleteDetalles,
        deleteOrdenes,
        deleteTipoPrenda,
        deleteEstadoOrden,
        deletePrecioDolar,
        deleteComplejidad,
        deletePrecioPrenda,
        deleteUser,
        deleteCotizacionOrden,
        deleteArchivos,
        deleteProcesos
    ])

    await prisma.$disconnect()
}

export default teardown