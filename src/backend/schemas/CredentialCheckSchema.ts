import { z } from "zod";

export const CredentialCheckSchema = z.object({
    username: z.string(),
    password: z.string()
})

export type CredentialCheckSchemaType = z.infer<typeof CredentialCheckSchema>;