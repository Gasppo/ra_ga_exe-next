import { OrderCreationData } from "@backend/schemas/OrderCreationSchema";
import { FileUploadResponse } from "@pages/api/drive/upload";
import { ComplejidadConfeccion, TipoPrenda } from "@prisma/client";


// Cargar archivos a Google Drive
export type FileUploadData = { clientName: string, orderID: string, formData: FormData }
export type DriveUploadResponse = { data: FileUploadResponse | FileUploadResponse[] }
export type ErrorMessage = { error: string }
export type TipoPrendaExtended = {
    id: string;
    picture: string;
    name: string;
    precios: {
        precioBase: number;
        complejidad: {
            name: string;
        };
    }[];
}

export type PrecioPrendaExtended = {
    id: string,
    precioBase: number;
    complejidad: { name: string };
    tipo: { name: string }
}

export const errorHandle = (res: Response) => res.json().then(json => Promise.reject(json))


// Obtener lista de ropas
export const getClothes = (): Promise<TipoPrenda[]> => fetch('/api/clothes/obtain')
    .then(res => res.ok ? res.json() : errorHandle(res))
    .catch((error) => { throw error });

// Agregar nueva prenda
export const addClothes = (data: TipoPrenda): Promise<TipoPrenda> => fetch('/api/clothes/new', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
})
    .then(res => res.ok ? res.json() : errorHandle(res))
    .catch((error) => { throw error });

// Obtener precios de una prenda
export const getClothingAndPrices = (id: string): Promise<TipoPrendaExtended> => fetch(`/api/clothes/obtain/${id}`)
    .then(res => res.ok ? res.json() : errorHandle(res))
    .catch((error) => { throw error });

// Obtener precios de una prenda
export const getSinglePrice = (id: string): Promise<PrecioPrendaExtended> => fetch(`/api/clothes/singlePrice/obtain/${id}`)
    .then(res => res.ok ? res.json() : errorHandle(res))
    .catch((error) => { throw error });

// Modificar el precioBase de una prenda
export const modifySinglePrice = (data: PrecioPrendaExtended): Promise<PrecioPrendaExtended> => fetch(`/api/clothes/singlePrice/modify/${data.id}`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
})
    .then(res => res.ok ? res.json() : errorHandle(res))
    .catch((error) => { throw error });

// Obtener todas las prendas con sus precios
export const getAllClothesPrices = (): Promise<PrecioPrendaExtended[]> => fetch('/api/clothes/obtainPrices')
    .then(res => res.ok ? res.json() : errorHandle(res))
    .catch((error) => { throw error });

// Modificar prenda
export const modifyClothes = (data: TipoPrendaExtended): Promise<TipoPrenda> => fetch(
    `/api/clothes/modify/${data.id}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        id: data.id,
        name: data.name,
        picture: data.picture,
    })
}).then(res => res.ok ? res.json() : errorHandle(res))
    .catch((error) => { throw error });


// Obtener lista de complejidades
export const getComplexity = (): Promise<ComplejidadConfeccion[]> => fetch('/api/complexity/obtain')
    .then(res => res.ok ? res.json() : errorHandle(res))
    .catch((error) => { throw error });


// Cargar archivos a Google Drive
export const uploadFile = (data: FileUploadData): Promise<DriveUploadResponse> => fetch(`/api/drive/upload?client=${data.clientName}&order=${data.orderID}`, { method: 'POST', body: data.formData })
    .then(res => res.ok ? res.json() : errorHandle(res))
    .catch((error) => { console.log('Broke here'); throw error });


// Crear orden
export const createOrder = (data: OrderCreationData): Promise<{ message: string }> => fetch(`/api/order/new`, { method: 'POST', headers: { "Content-Type": "application/json", accept: "application/json" }, body: JSON.stringify(data) })
    .then(res => res.ok ? res.json() : errorHandle(res))
    .catch((error) => { throw error });



export const updateFileURL = (data: OrderCreationData, file: FileUploadResponse, mapKeys: { [key: string]: string }) => {
    if (mapKeys[file.fileName] === 'molderiaBase.files') {
        data.molderiaBase.files = data.molderiaBase.files.map(el => el.name === file.fileName ? { ...el, urlID: file.file.data.id } : el)
    }
    else if (mapKeys[file.fileName] === 'geometral.files') {
        data.geometral.files = data.geometral.files.map(el => el.name === file.fileName ? { ...el, urlID: file.file.data.id } : el)
    }
    else if (mapKeys[file.fileName] === 'logoMarca.files') {
        data.logoMarca.files = data.logoMarca.files.map(el => el.name === file.fileName ? { ...el, urlID: file.file.data.id } : el)
    }
}