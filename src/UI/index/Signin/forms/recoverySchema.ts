import { z } from "zod";


const emailErrorMessage = () => `Formato de correo electrónico inválido`;


export const RecoverySchema = z.object({
    email: z.string().email({ message: emailErrorMessage() }),
})