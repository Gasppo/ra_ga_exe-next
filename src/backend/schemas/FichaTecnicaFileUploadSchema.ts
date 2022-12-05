import { Paths } from "@UI/Types/nestedObjTypes";
import { z } from "zod";

export const FichaTecnicaFileUploadSchema = z.object({
    fichaFiles: z.object({
        observaciones: z.string(),
        files: z.array(z.object({
            name: z.string(),
            urlID: z.string(),
            type: z.string()
        }))
    }),
})


export type ValidatedFichaTecnicaFileUploadSchema = z.infer<typeof FichaTecnicaFileUploadSchema>

export type FichaTecnicaUploadFormData = ValidatedFichaTecnicaFileUploadSchema & { files: { file: File, section: Paths<ValidatedFichaTecnicaFileUploadSchema> }[] }