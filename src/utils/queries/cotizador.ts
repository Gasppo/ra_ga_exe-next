import { drive_v3 } from "googleapis";
import { GaxiosResponse } from "gaxios";




// Cargar archivos a Google Drive
export type FileUploadData = { clientName: string, orderID: string, formData: FormData }
export type FileUploadResponse = { data?: GaxiosResponse<drive_v3.Schema$File> | GaxiosResponse<drive_v3.Schema$File>[] } | { error?: any }
export type ErrorMessage = { error: string }

const errorHandle = (res: Response) => res.json().then(json => Promise.reject(json))


// Obtener lista de ropas
export const getClothes = () => fetch('/api/clothes/obtain')
    .then(res => res.ok ? res.json() : errorHandle(res))
    .catch((error) => { throw error });

// Obtener lista de complejidades
export const getComplexity = () => fetch('/api/complexity/obtain')
    .then(res => res.ok ? res.json() : errorHandle(res))
    .catch((error) => { throw error });

// Cargar archivos a Google Drive
export const uploadFile = (data: FileUploadData): Promise<FileUploadResponse> => fetch(`/api/drive/upload?client=${data.clientName}&order=${data.orderID}`, { method: 'POST', body: data.formData })
    .then(res => res.ok ? res.json() : errorHandle(res))
    .catch((error) => { throw error });