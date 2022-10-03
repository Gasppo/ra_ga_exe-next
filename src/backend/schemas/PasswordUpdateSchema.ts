import { maxCharErrorMessage, minCharErrorMessage } from "@backend/errors/errorMessages";
import { z } from "zod";


export const PasswordUpdateSchema = z.object({
    token: z.string().uuid({ message: "El token no es válido" }),
    password: z.string().min(8, { message: minCharErrorMessage(8) }).max(50, { message: maxCharErrorMessage(50) }),
    confirmPassword: z.string().min(8, { message: minCharErrorMessage(8) }).max(50, { message: maxCharErrorMessage(50) }),
}).refine(data => data.password === data.confirmPassword, "Las contraseñas deben ser iguales");


export type PasswordUpdateSchemaType = z.infer<typeof PasswordUpdateSchema>;