import { OrderCreationData } from "@backend/schemas/OrderCreationSchema";
import { ProcessUpdateSchemaType } from "@backend/schemas/ProcessUpdateResourcesSchema";
import { FileUploadResponse } from "@pages/api/drive/upload";
import { ComplejidadConfeccion, EstadoProcesoDesarrollo, Orden, ProcesoDesarrollo, ProcesoDesarrolloOrden, TipoPrenda, User } from "@prisma/client";


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



export const updateFileURL = (data: OrderCreationData, file: FileUploadResponse) => {
    data.orderFiles.files = data.orderFiles.files.map(el => el.name === file.fileName ? { ...el, urlID: file.file.data.id } : el)

}

export const availableComplexities = (idPrenda: string): Promise<ComplejidadConfeccion[]> => fetch('/api/clothes/available-complexities?idPrenda=' + idPrenda,)
    .then(res => res.ok ? res.json() : errorHandle(res))
    .catch((error) => { throw error });


export const fetchPrice = async (data: OrderCreationData): Promise<{
    price: number,
    preciosIndividuales: { servicio: string, precioTotal: number }[],
}> => {
    return await fetch(`/api/order/calculate-price`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
    }).then(res => res.json())
}

export const fetchProcessStates = (): Promise<EstadoProcesoDesarrollo[]> => fetch('/api/order/get-process-states')
    .then(res => res.ok ? res.json() : errorHandle(res))
    .catch((error) => { throw error });


export const updateProcessState = (data: { estado: string; proceso: string; icon: string; id: string; }): Promise<
    ProcesoDesarrolloOrden & {
        orden: Orden & {
            user: User;
        };
        proceso: ProcesoDesarrollo;
    }> =>
    fetch(`/api/order/update-process-state`, { method: 'POST', headers: { "Content-Type": "application/json", accept: "application/json" }, body: JSON.stringify(data) })
        .then(res => res.ok ? res.json() : errorHandle(res))
        .catch((error) => { throw error });


export const fetchServiceUsers = (): Promise<{ id: string; email: string; name: string; }[]> => fetch('/api/users/obtainServiceUsers')
    .then(res => res.ok ? res.json() : errorHandle(res))
    .catch((error) => { throw error });

export const updateProcessResources = (data: ProcessUpdateSchemaType): Promise<
    ProcesoDesarrolloOrden & {
        orden: Orden & {
            user: User;
        };
        proceso: ProcesoDesarrollo;
    }> => fetch(`/api/order/update-process-resources`, { method: 'POST', headers: { "Content-Type": "application/json", accept: "application/json" }, body: JSON.stringify(data) })
        .then(res => res.ok ? res.json() : errorHandle(res))
        .catch((error) => { throw error });