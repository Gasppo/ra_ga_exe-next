import { z } from "zod";


const emailErrorMessage = () => `Formato de correo electrónico inválido`;


export const SignInSchema = z.object({
    email: z.string().email({ message: emailErrorMessage() }),
    password: z.string()
})