import { fromToday } from '@backend/dbcalls/user';
import handleOrderCreation from '@pages/api/order/new';
import handleUserCreation from '@pages/api/user/create';
import { Orden, PrismaClient } from '@prisma/client';
import { fichaTecnicaVaciaForm } from '@UI/Types/fichaTecnicaTypes';
import { generateMockRes } from '@utils/tests/generateMockRes';
import { NextApiRequest } from 'next';
const prisma = new PrismaClient()

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


});

afterAll(async () => {
    //Delete everything created
    await prisma.user.deleteMany({})
    await prisma.tipoPrenda.deleteMany({})
    await prisma.estadoOrden.deleteMany({})
    await prisma.precioDelDolar.deleteMany({})
    await prisma.complejidadConfeccion.deleteMany({})
    await prisma.precioPrenda.deleteMany({})

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
    const data = {
        ...fichaTecnicaVaciaForm,
        geometral: {
            files: [{ name: 'test', type: 'geometral', urlID: 'test' }],
            observaciones: 'Test',
            selected: true
        },
        user: {
            email: 'gasppogb@gmail.com',
            name: 'Test',
        },
        tipoPrenda: {
            id: prenda.id,
            name: prenda.name,
        }
    }



    const { res, json, status } = generateMockRes<{ error?: any, message?: string, data?: Orden }>()
    const req = { method: 'POST', body: data } as NextApiRequest

    await handleOrderCreation(req, res)
    expect(status.mock.calls[0][0]).toBe(200)
    expect(json.mock.calls[0][0].data.nombre).toBe('Pantalón Básico')
})