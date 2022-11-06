import { OrderCreationData } from '@backend/schemas/OrderCreationSchema';
import handleOrderCreation from '@pages/api/order/new';
import obtainAllOrders from '@pages/api/orders/obtainAll';
import handleUserCreation from '@pages/api/user/create';
import { Archivo, CotizacionOrden, EstadoOrden, Orden, PrismaClient, Servicio, User } from '@prisma/client';
import { fichaTecnicaVaciaForm } from '@UI/Types/fichaTecnicaTypes';
import { afterTesting, beforeTesting } from '@utils/tests/configitems';
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

beforeAll(beforeTesting);
afterAll(afterTesting)


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
        "Moldería Base": { selected: true }
    }

    const { res, json, status } = generateMockRes<{ error?: any, message?: string, data?: NewOrderResponse }>()
    const req = { method: 'POST', body: data } as NextApiRequest

    await handleOrderCreation(req, res)
    expect(json.mock.calls[0][0].error).toBe(undefined)
    expect(status.mock.calls[0][0]).toBe(200)
    expect(json.mock.calls[0][0].data.nombre).toBe('Pantalón Básico con Precio')
    expect(json.mock.calls[0][0].data.cotizacionOrden[0].precio).toBe(precioBase.precioBase * precioDolar.precio)
})

it('Should create multiple orders and be able to obtain them', async () => {
    const prenda_1 = await prisma.tipoPrenda.findFirst({ where: { name: 'Pantalón' } })
    const precioBase_1 = await prisma.precioPrenda.findFirst({ where: { tipoId: prenda_1.id } })

    const prenda_2 = await prisma.tipoPrenda.findFirst({ where: { name: 'Remera / Camiseta' } })
    const precioBase_2 = await prisma.precioPrenda.findFirst({ where: { tipoId: prenda_2.id } })

    const precioDolar = await prisma.precioDelDolar.findFirst({ orderBy: { fechaDesde: 'desc' } })
    await prisma.atributoPrenda.deleteMany({})
    await prisma.detallesPrenda.deleteMany({})
    await prisma.orden.deleteMany({})

    const data_1: OrderCreationData = {
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
            id: prenda_1.id,
            name: prenda_1.name,
        },
        complejidad: 'Básico',
        "Moldería Base": { selected: true }
    }

    const data_2: OrderCreationData = {
        ...fichaTecnicaVaciaForm,
        nombreProducto: 'Remera Básica con Precio',
        orderFiles: {
            files: [{ name: 'test', type: 'orderFiles', urlID: 'test' }],
            observaciones: 'Test',
        },
        user: {
            email: 'gasppogb@gmail.com',
            name: 'Test',
        },
        tipoPrenda: {
            id: prenda_2.id,
            name: prenda_2.name,
        },
        complejidad: 'Básico',
        "Moldería Base": { selected: true }
    }

    // Creo los mocks
    const { res: res_1, json: json_1, status: status_1 } = generateMockRes<{ error?: any, message?: string, data?: NewOrderResponse }>()
    const { res: res_2, json: json_2, status: status_2 } = generateMockRes<{ error?: any, message?: string, data?: NewOrderResponse }>()
    const { res: res_all, json: json_all, status: status_all } = generateMockRes()

    const req_1 = { method: 'POST', body: data_1 } as NextApiRequest
    const req_2 = { method: 'POST', body: data_2 } as NextApiRequest
    const req_all = { method: 'GET' } as NextApiRequest

    //Creo primera orden
    await handleOrderCreation(req_1, res_1)
    expect(json_1.mock.calls[0][0].error).toBe(undefined)
    expect(status_1.mock.calls[0][0]).toBe(200)
    expect(json_1.mock.calls[0][0].data.nombre).toBe('Pantalón Básico con Precio')
    expect(json_1.mock.calls[0][0].data.cotizacionOrden[0].precio).toBe(precioBase_1.precioBase * precioDolar.precio)

    //Creo segunda orden
    await handleOrderCreation(req_2, res_2)
    expect(json_2.mock.calls[0][0].error).toBe(undefined)
    expect(status_2.mock.calls[0][0]).toBe(200)
    expect(json_2.mock.calls[0][0].data.nombre).toBe('Remera Básica con Precio')
    expect(json_2.mock.calls[0][0].data.cotizacionOrden[0].precio).toBe(precioBase_2.precioBase * precioDolar.precio)

    //Obtengo ordenes
    await obtainAllOrders(req_all, res_all)
    expect(json_all.mock.calls[0][0]?.error).toBe(undefined)
    expect(status_all.mock.calls[0][0]).toBe(200)
    expect(json_all.mock.calls[0][0].length).toBe(2)

})