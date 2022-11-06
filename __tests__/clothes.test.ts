import { NewClothingCategorySchemaType } from "@backend/schemas/NewClothingCategorySchema";
import getComplexitiesByClothesID from "@pages/api/clothes/available-complexities";
import nuevaPrenda from "@pages/api/clothes/new";
import obtainClothes from "@pages/api/clothes/obtain";
import obtainPrices from "@pages/api/clothes/obtainPrices";
import { ComplejidadConfeccion, Prisma, TipoPrenda } from "@prisma/client";
import { afterTesting, beforeTesting } from "@utils/tests/configitems";
import { generateMockRes } from "@utils/tests/generateMockRes";
import { NextApiRequest } from "next";

type ObtainPricesResponse = { complejidad: { name: string; }; id: string; tipo: { name: string; }; precioBase: number; }[]
type ObtainClothesResponse = TipoPrenda[]
type CreateClothesResponse = { prenda: TipoPrenda, precios: Prisma.BatchPayload }

beforeAll(beforeTesting);
afterAll(afterTesting)

it('Shuold obtain all clothes', async () => {
    const { res, json, status } = generateMockRes<ObtainClothesResponse>()
    const req = { method: 'GET' } as NextApiRequest
    await obtainClothes(req, res)

    expect(status.mock.calls[0][0]).toBe(200)
    expect(json.mock.calls[0][0].length).toBe(2)
    expect(json.mock.calls[0][0][0].name).toBe('Pantalón')
    expect(json.mock.calls[0][0][1].name).toBe('Remera / Camiseta')
})

it('Should obtain all clothes prices', async () => {

    const { res, json, status } = generateMockRes<ObtainPricesResponse>()
    const req = { method: 'GET' } as NextApiRequest

    await obtainPrices(req, res)
    expect(status.mock.calls[0][0]).toBe(200)
    expect(json.mock.calls[0][0].length).toBe(2)
    expect(json.mock.calls[0][0][0].precioBase).toBe(18)
    expect(json.mock.calls[0][0][1].precioBase).toBe(12)
    expect(json.mock.calls[0][0][0].complejidad.name).toBe('Básico')
    expect(json.mock.calls[0][0][1].complejidad.name).toBe('Básico')
    expect(json.mock.calls[0][0][0].tipo.name).toBe('Pantalón')
    expect(json.mock.calls[0][0][1].tipo.name).toBe('Remera / Camiseta')

})

it('Should create a new clothing type', async () => {

    const data: NewClothingCategorySchemaType = {
        name: 'Calzones',
        picture: 'test',
        precioBasico: 10,
        precioComplejo: 20,
        precioExtremadamenteComplejo: 30,
        precioMuyComplejo: 40,
        precioMedio: 50,
        precioUltraComplejo: 60,
    }

    const { res: res_create, json: json_create, status: status_create } = generateMockRes<CreateClothesResponse>()
    const req_create = { method: 'POST', body: data } as NextApiRequest

    const { res: res_obtainClothes, json: json_obtainClothes, status: status_obtainClothes } = generateMockRes<ObtainClothesResponse>()
    const { res: res_obtainPrices, json: json_obtainPrices, status: status_obtainPrices } = generateMockRes<ObtainPricesResponse>()

    const req = { method: 'GET' } as NextApiRequest


    await nuevaPrenda(req_create, res_create)
    expect(status_create.mock.calls[0][0]).toBe(200)
    expect(json_create.mock.calls[0][0].prenda.name).toBe('Calzones')
    expect(json_create.mock.calls[0][0].prenda.picture).toBe('test')

    await obtainClothes(req, res_obtainClothes)
    expect(status_obtainClothes.mock.calls[0][0]).toBe(200)
    expect(json_obtainClothes.mock.calls[0][0].length).toBe(3)
    expect(json_obtainClothes.mock.calls[0][0][2].name).toBe('Calzones')

    await obtainPrices(req, res_obtainPrices)
    expect(status_obtainPrices.mock.calls[0][0]).toBe(200)
    expect(json_obtainPrices.mock.calls[0][0].length).toBe(8)

})

it('Should check complexities for a specific clothing type', async () => {

    const data: NewClothingCategorySchemaType = {
        name: 'Pañuelo',
        picture: 'test',
        precioBasico: 10,
        precioComplejo: 20,
        precioExtremadamenteComplejo: 30,
        precioMuyComplejo: 40,
        precioMedio: 50,
        precioUltraComplejo: 60,
    }

    const { res: res_create, json: json_create, status: status_create } = generateMockRes<CreateClothesResponse>()
    const req_create = { method: 'POST', body: data } as NextApiRequest

    const { res: res_obtainPrices, json: json_obtainPrices, status: status_obtainPrices } = generateMockRes<ObtainPricesResponse>()
    const req_obtainPrices = { method: 'GET' } as NextApiRequest


    await nuevaPrenda(req_create, res_create)
    expect(status_create.mock.calls[0][0]).toBe(200)
    expect(json_create.mock.calls[0][0].prenda.name).toBe('Pañuelo')
    expect(json_create.mock.calls[0][0].prenda.picture).toBe('test')

    await obtainPrices(req_obtainPrices, res_obtainPrices)
    expect(status_obtainPrices.mock.calls[0][0]).toBe(200)
    expect(json_obtainPrices.mock.calls[0][0].length).toBe(14)

    //generate mock for obtainComplexities
    const { res: res_obtainComplexities, json: json_obtainComplexities, status: status_obtainComplexities } = generateMockRes<ComplejidadConfeccion[]>()
    const req_obtainComplexities = { query: { idPrenda: json_create.mock.calls[0][0].prenda.id } } as unknown as NextApiRequest

    await getComplexitiesByClothesID(req_obtainComplexities, res_obtainComplexities)
    expect(status_obtainComplexities.mock.calls[0][0]).toBe(200)
    expect(json_obtainComplexities.mock.calls[0][0].length).toBe(6)
    expect(json_obtainComplexities.mock.calls[0][0][0].name).toBe('Básico')

})