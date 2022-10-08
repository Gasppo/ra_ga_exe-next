import { OrderCreationData } from "@backend/schemas/OrderCreationSchema";
import { FileUploadResponse } from "@pages/api/drive/upload";
import { TipoPrenda } from "@prisma/client";


// Cargar archivos a Google Drive
export type FileUploadData = { clientName: string, orderID: string, formData: FormData }
export type DriveUploadResponse = { data: FileUploadResponse | FileUploadResponse[] }
export type ErrorMessage = { error: string }

export const errorHandle = (res: Response) => res.json().then(json => Promise.reject(json))


// Obtener lista de ropas
export const getClothes = (): Promise<TipoPrenda[]> => fetch('/api/clothes/obtain')
    .then(res => res.ok ? res.json() : errorHandle(res))
    .catch((error) => { throw error });

// Obtener lista de complejidades
export const getComplexity = () => fetch('/api/complexity/obtain')
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