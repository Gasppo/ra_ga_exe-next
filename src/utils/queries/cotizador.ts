import { drive_v3 } from "googleapis";
import { GaxiosResponse } from "gaxios";


// Obtener lista de ropas
export const getClothes = () => fetch('/api/clothes/obtain').then(res => res.json())

// Obtener lista de complejidades
export const getComplexity = () => fetch('/api/complexity/obtain').then(res => res.json())


// Cargar archivos a Google Drive
type FileUploadData = { clientName: string, orderID: string, formData: FormData }
type FileUploadResponse = { data?: GaxiosResponse<drive_v3.Schema$File> | GaxiosResponse<drive_v3.Schema$File>[] } | { error?: any }

export const uploadFile = (data: FileUploadData): Promise<FileUploadResponse> => fetch(`/api/drive/upload?client=${data.clientName}&order=${data.orderID}`, { method: 'POST', body: data.formData })
    .then(res => res.json())
    .catch((error) => {
        console.log(error)
    });
