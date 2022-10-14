import { z } from "zod";

export const CredentialCheckSchema = z.object({
    username: z.string().email({ message: "Formato de correo electrónico inválido" }),
    password: z.string().min(8, { message: "Se requiere un mínimo de 8 caracteres" }),
})

export type CredentialCheckSchemaType = z.infer<typeof CredentialCheckSchema>;