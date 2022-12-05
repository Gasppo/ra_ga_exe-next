import { FichaTecnicaUploadFormData, ValidatedFichaTecnicaFileUploadSchema } from "@backend/schemas/FichaTecnicaFileUploadSchema";
import { FileUploadResponse } from "@pages/api/drive/uploadToFicha";
import { FichaTecnica } from "@prisma/client";
import { DriveUploadResponse, errorHandle } from "@utils/queries/cotizador";

type FileUploadData = { clientName: string, orderID: string, formData: FormData, fichaType: string }

export const updateFileURL = (data: FichaTecnicaUploadFormData, file: FileUploadResponse) => {
    data.fichaFiles.files = data.fichaFiles.files.map(el => el.name === file.fileName ? { ...el, urlID: file.file.data.id } : el)

}

export const uploadFile = (data: FileUploadData): Promise<DriveUploadResponse> => fetch(`/api/drive/uploadToFicha?client=${data.clientName}&order=${data.orderID}&fichaType=${data.fichaType}`, { method: 'POST', body: data.formData })
    .then(res => res.ok ? res.json() : errorHandle(res))
    .catch((error) => { console.log('Broke here'); throw error });


export const updateFichaFiles = ({ data, fichaID }: { data: ValidatedFichaTecnicaFileUploadSchema, fichaID: string }): Promise<FichaTecnica> => fetch(`/api/order/update-ficha-files?fichaID=${fichaID}`, { method: 'POST', headers: { "Content-Type": "application/json", accept: "application/json" }, body: JSON.stringify(data) })
    .then(res => res.ok ? res.json() : errorHandle(res))
    .catch((error) => { console.log('Broke here'); throw error });