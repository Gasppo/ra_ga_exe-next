import { emailErrorMessage, maxCharErrorMessage, minCharErrorMessage, exactCharErrorMessage } from "@backend/errors/errorMessages";
import { z } from "zod";

export const UserCreationSchema = z.object({
    name: z.string().min(1, { message: minCharErrorMessage(1) }).max(50, { message: maxCharErrorMessage(50) }),
    email: z.string().email({ message: emailErrorMessage() }),
    password: z.string().min(8, { message: minCharErrorMessage(8) }).max(50, { message: maxCharErrorMessage(50) }),
    confirmPassword: z.string().min(8, { message: minCharErrorMessage(8) }).max(50, { message: maxCharErrorMessage(50) }),
    telefono: z.string().length(10, { message: exactCharErrorMessage(10)}),
    cuit: z.string(),
    razonSocial: z.string(),
    direccionFacturacion:z.string(),
    direccionEnvio: z.string()
}).refine(data => data.password === data.confirmPassword, "Las contraseñas deben ser iguales");

export type UserCreationSchemaType = z.infer<typeof UserCreationSchema>;