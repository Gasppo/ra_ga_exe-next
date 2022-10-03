import { emailErrorMessage } from "@backend/errors/errorMessages";
import { z } from "zod";

export const SignInSchema = z.object({
    email: z.string().email({ message: emailErrorMessage() }),
    password: z.string()
})

export type SignInSchemaType = z.infer<typeof SignInSchema>;