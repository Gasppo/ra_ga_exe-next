import { emailErrorMessage, maxCharErrorMessage, minCharErrorMessage } from "@backend/errors/errorMessages";
import { z } from "zod";

export const UserCreationSchema = z.object({
    name: z.string().min(1, { message: minCharErrorMessage(1) }).max(50, { message: maxCharErrorMessage(50) }),
    email: z.string().email({ message: emailErrorMessage() }),
    password: z.string().min(8, { message: minCharErrorMessage(8) }).max(50, { message: maxCharErrorMessage(50) }),
    confirmPassword: z.string().min(8, { message: minCharErrorMessage(8) }).max(50, { message: maxCharErrorMessage(50) }),
    isServiceProvider: z.boolean()
}).refine(data => data.password === data.confirmPassword, "Las contraseñas deben ser iguales");

export type UserCreationSchemaType = z.infer<typeof UserCreationSchema>;