import { emailErrorMessage, maxCharErrorMessage, minCharErrorMessage } from "@backend/errors/errorMessages";
import { z } from "zod";

export const OrderMessageSchema = z.object({
    userEmail: z.string().email({ message: emailErrorMessage() }),
    orderId: z.string(),
    message: z.string().min(1, { message: minCharErrorMessage(1) }).max(500, { message: maxCharErrorMessage(500) }),
})

export type OrderMessageSchemaType = z.infer<typeof OrderMessageSchema>;