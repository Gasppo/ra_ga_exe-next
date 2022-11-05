import { fromToday } from '@backend/dbcalls/user';
import { OrderCreationData } from '@backend/schemas/OrderCreationSchema';
import handleOrderCreation from '@pages/api/order/new';
import handleUserCreation from '@pages/api/user/create';
import { Archivo, CotizacionOrden, EstadoOrden, Orden, PrismaClient, Servicio, User } from '@prisma/client';
import { fichaTecnicaVaciaForm } from '@UI/Types/fichaTecnicaTypes';
import { generateMockRes } from '@utils/tests/generateMockRes';
import { NextApiRequest } from 'next';
const prisma = new PrismaClient()

type NewOrderResponse = Orden & {
    user: User;
    servicios: Servicio[];
    estado: EstadoOrden;
    archivos: Archivo[];
    cotizacionOrden: CotizacionOrden[];
}

beforeAll(async () => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
    jest.spyOn(console, 'debug').mockImplementation(jest.fn());

    await prisma.tipoPrenda.createMany({
        data: [
            { name: 'Pantalón', picture: 'https://cdn-icons-png.flaticon.com/512/2122/2122621.png' },
            { name: 'Remera / Camiseta', picture: 'https://cdn-icons-png.flaticon.com/512/2357/2357127.png' },
        ]
    })

    await prisma.estadoOrden.createMany({
        data: [
            { nombre: 'Aguardando Confirmación' },
            { nombre: 'Seña Pendiente' },
            { nombre: 'En produccion' },
            { nombre: 'Aguarando Servicios Externos' },
            { nombre: 'Aguardando Envío' },
            { nombre: 'Rechazado' },
            { nombre: 'Expirado' },
            { nombre: 'Cancelado' }
        ]
    })

    await prisma.precioDelDolar.create({
        data: { precio: 100, fechaHasta: fromToday(60 * 60 * 24 * 15) }
    })


    await prisma.complejidadConfeccion.createMany({
        data: [
            { name: 'Básico', description: 'Básico' },
            { name: 'Medio', description: 'Medio' },
            { name: 'Complejo', description: 'Complejo' },
            { name: 'Muy Complejo', description: 'Muy Complejo' },
            { name: 'Ultra Complejo', description: 'Ultra Complejo' }
        ]
    })

    await prisma.precioPrenda.create({
        data: {
            precioBase: 18,
            complejidad: { connect: { name: 'Básico' } },
            tipo: { connect: { name: 'Pantalón' } },
        }
    })


    await prisma.precioPrenda.create({
        data: {
            precioBase: 12,
            complejidad: { connect: { name: 'Básico' } },
            tipo: { connect: { name: 'Remera / Camiseta' } },
        }
    })

    await prisma.servicio.createMany({
        data: [
            {
                "description": "Moldería Original en Papel",
                "factorMultiplicador": 1,
                "name": "Moldería Base",
                "precioFijo": 0
            },
            {
                "description": "Dibujo Geometral y Detalles",
                "factorMultiplicador": 1.2,
                "name": "geometral",
                "precioFijo": 0
            },
            {
                "description": "Corte Muestra (Hasta 5u.)",
                "factorMultiplicador": 0.4545454545454545,
                "name": "Corte Muestra",
                "precioFijo": 0
            },
            {
                "description": "Confección Muestrista",
                "factorMultiplicador": 1.25,
                "name": "Confección Muestrista",
                "precioFijo": 0
            },
            {
                "description": "Ficha Técnica de Consumos",
                "factorMultiplicador": 0.8,
                "name": "Ficha Técnica de Consumos",
                "precioFijo": 0
            },
            {
                "description": "Corte Nano  (5 a 20 u.)",
                "factorMultiplicador": 0.25,
                "name": "Corte Nano",
                "precioFijo": 0
            },
            {
                "description": "Corte Micro  (20 a 80 u.)",
                "factorMultiplicador": 0.1428571428571428,
                "name": "Corte Micro",
                "precioFijo": 0
            },
            {
                "description": "Corte Mini (80 a 250 u.)",
                "factorMultiplicador": 0.09090909090909091,
                "name": "Corte Mini",
                "precioFijo": 0
            },
            {
                "description": "Corte Medio (250 a 1000)",
                "factorMultiplicador": 0.05882352941176471,
                "name": "Corte Medio",
                "precioFijo": 0
            },
            {
                "description": "Corte Alto (1000 o +)",
                "factorMultiplicador": 0.04,
                "name": "Corte Alto",
                "precioFijo": 0
            },
            {
                "description": "Confección Muestra       (5 o -)",
                "factorMultiplicador": 1,
                "name": "Confección Muestra",
                "precioFijo": 0
            },
            {
                "description": "Confección (5 a 20 u.)",
                "factorMultiplicador": 0.4545454545454545,
                "name": "Confección Nano",
                "precioFijo": 0
            },
            {
                "description": "Confección (20 a 80 u.)",
                "factorMultiplicador": 0.3333333333333333,
                "name": "Confección Micro",
                "precioFijo": 0
            },
            {
                "description": "Confección (80 a 250 u.)",
                "factorMultiplicador": 0.2325581395348837,
                "name": "Confección Mini",
                "precioFijo": 0
            },
            {
                "description": "Confección (250 a 1000)",
                "factorMultiplicador": 0.1818181818181818,
                "name": "Confección Medio",
                "precioFijo": 0
            },
            {
                "description": "Confección (1000 o +)",
                "factorMultiplicador": 0.1666666666666667,
                "name": "Confección Alto",
                "precioFijo": 0
            },
            {
                "description": "Control Calidad",
                "factorMultiplicador": 0.0125,
                "name": "Control Calidad",
                "precioFijo": 0
            },
            {
                "description": "Digitalización, Progresiones (x Pieza)",
                "factorMultiplicador": 0,
                "name": "Digitalización y Progresiones",
                "precioFijo": 3
            },
            {
                "description": "Plotteo Vinilos (x Metro)",
                "factorMultiplicador": 0,
                "name": "Plotteo Vinilos",
                "precioFijo": 25
            },
            {
                "description": "Despuntillado ( x Metro )",
                "factorMultiplicador": 0,
                "name": "Despuntillado",
                "precioFijo": 15
            },
            {
                "description": "Bajada Plancha",
                "factorMultiplicador": 0,
                "name": "Bajada Plancha",
                "precioFijo": 3
            },
            {
                "description": "Plotteo Tizada ( x Metro)",
                "factorMultiplicador": 0,
                "name": "Plotteo Tizada",
                "precioFijo": 6
            },
            {
                "description": "Programa Tizada ( x Metro)",
                "factorMultiplicador": 0,
                "name": "Programa Tizada",
                "precioFijo": 6
            }
        ]
    })
});

afterAll(async () => {
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
})


it('Should create a User with correct values', async () => {

    const data = {
        name: 'Test',
        email: 'gasppogb@gmail.com',
        password: '123456asd',
        confirmPassword: '123456asd'
    }

    const { res, json } = generateMockRes()

    const req = { method: 'POST', body: data } as NextApiRequest

    await handleUserCreation(req, res)
    expect(json.mock.calls[0][0].statusCode).toBe(200)
    expect(json.mock.calls[0][0].body.user.email).toBe('gasppogb@gmail.com')
    expect(json.mock.calls[0][0].body.user.name).toBe('Test')
    expect(json.mock.calls[0][0].body.user.name).toBe('Test')
})


it('Should create a new order with correct values', async () => {
    const prenda = await prisma.tipoPrenda.findFirst({ where: { name: 'Pantalón' } })
    const data: OrderCreationData = {
        ...fichaTecnicaVaciaForm,
        nombreProducto: 'Pantalón Básico',
        orderFiles: {
            files: [{ name: 'test', type: 'orderFiles', urlID: 'test' }],
            observaciones: 'Test',
        },
        user: {
            email: 'gasppogb@gmail.com',
            name: 'Test',
        },
        tipoPrenda: {
            id: prenda.id,
            name: prenda.name,
        },
        complejidad: 'Básico',
    }



    const { res, json, status } = generateMockRes<{ error?: any, message?: string, data?: NewOrderResponse }>()
    const req = { method: 'POST', body: data } as NextApiRequest

    await handleOrderCreation(req, res)
    expect(status.mock.calls[0][0]).toBe(200)
    expect(json.mock.calls[0][0].data.nombre).toBe('Pantalón Básico')
})

it('Should create a new order with the selected services and generate the correct Price', async () => {
    const prenda = await prisma.tipoPrenda.findFirst({ where: { name: 'Pantalón' } })
    const precioBase = await prisma.precioPrenda.findFirst({ where: { tipoId: prenda.id } })
    const precioDolar = await prisma.precioDelDolar.findFirst({ orderBy: { fechaDesde: 'desc' } })
    await prisma.atributoPrenda.deleteMany({})
    await prisma.detallesPrenda.deleteMany({})
    await prisma.orden.deleteMany({})

    const data: OrderCreationData = {
        ...fichaTecnicaVaciaForm,
        nombreProducto: 'Pantalón Básico con Precio',
        orderFiles: {
            files: [{ name: 'test', type: 'orderFiles', urlID: 'test' }],
            observaciones: 'Test',
        },
        user: {
            email: 'gasppogb@gmail.com',
            name: 'Test',
        },
        tipoPrenda: {
            id: prenda.id,
            name: prenda.name,
        },
        complejidad: 'Básico',
        "Moldería Base": { selected: true}
    }

    const { res, json, status } = generateMockRes<{ error?: any, message?: string, data?: NewOrderResponse }>()
    const req = { method: 'POST', body: data } as NextApiRequest

    await handleOrderCreation(req, res)
    expect(json.mock.calls[0][0].error).toBe(undefined)
    expect(status.mock.calls[0][0]).toBe(200)
    expect(json.mock.calls[0][0].data.nombre).toBe('Pantalón Básico con Precio')
    expect(json.mock.calls[0][0].data.cotizacionOrden[0].precio).toBe(precioBase.precioBase * precioDolar.precio)
})

