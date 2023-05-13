import { emailErrorMessage, maxCharErrorMessage, minCharErrorMessage } from "@backend/errors/errorMessages";
import { z } from "zod";

export const UserInfoSchema = z.object({
    name: z.string().min(1, { message: minCharErrorMessage(1) }).max(50, { message: maxCharErrorMessage(50) }),
    email: z.string().email({ message: emailErrorMessage() }),
    id: z.string().min(1, { message: minCharErrorMessage(1) }).max(50, { message: maxCharErrorMessage(50) }),
    userId: z.string().min(1, { message: minCharErrorMessage(1) }).max(50, { message: maxCharErrorMessage(50) }),
    createdAt: z.string().min(1, { message: minCharErrorMessage(1) }).max(50, { message: maxCharErrorMessage(50) }),
    updatedAt: z.string().min(1, { message: minCharErrorMessage(1) }).max(50, { message: maxCharErrorMessage(50) }),
    telefono: z.number().min(1, { message: minCharErrorMessage(1) }),
    whatsapp: z.number().min(1, { message: minCharErrorMessage(1) }),
    marca: z.string().min(1, { message: minCharErrorMessage(1) }).max(50, { message: maxCharErrorMessage(50) }),
    direccionFacturacion: z.string().min(1, { message: minCharErrorMessage(1) }).max(50, { message: maxCharErrorMessage(50) }),
    direccionEnvio: z.string().min(1, { message: minCharErrorMessage(1) }).max(50, { message: maxCharErrorMessage(50) }),
    ciudad: z.string().min(1, { message: minCharErrorMessage(1) }).max(50, { message: maxCharErrorMessage(50) }),
    cuitORazonSocial: z.string().min(1, { message: minCharErrorMessage(1) }).max(50, { message: maxCharErrorMessage(50) }),
    mediosDePago: z.string().min(1, { message: minCharErrorMessage(1) }).max(50, { message: maxCharErrorMessage(50) }),
    datosBancarios: z.string().min(1, { message: minCharErrorMessage(1) }).max(50, { message: maxCharErrorMessage(50) }),
})

export type UserInfoSchemaType = z.infer<typeof UserInfoSchema>;