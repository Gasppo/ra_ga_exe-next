import { emailErrorMessage } from "@backend/errors/errorMessages";
import { z } from "zod";

export const EmailCheckSchema = z.object({
    email: z.string().email({ message: emailErrorMessage() }),
})

export type ResetEmailSchemaType = z.infer<typeof EmailCheckSchema>;
