import { maxCharErrorMessage, minCharErrorMessage } from "@backend/errors/errorMessages";
import { z } from "zod";

export const RoleModificationSchema = z.object({
    id: z.string().min(1, { message: minCharErrorMessage(1) }).max(50, { message: maxCharErrorMessage(50) }),
    role: z.string().min(1, { message: minCharErrorMessage(1) }).max(50, { message: maxCharErrorMessage(50) }),
});

export type RoleModificationSchemaType = z.infer<typeof RoleModificationSchema>;