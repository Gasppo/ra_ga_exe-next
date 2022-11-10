import { PrismaClient } from "@prisma/client";

const fromToday = (time: number, date = Date.now()) => {
    return new Date(date + time * 1000)
}
const prisma = new PrismaClient()

const setup = async () => {

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
            { name: 'Ultra Complejo', description: 'Ultra Complejo' },
            { name: 'Extremadamente complejo', description: 'Extremadamente complejo' },
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
}

export default setup
