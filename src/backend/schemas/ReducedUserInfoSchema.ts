import { emailErrorMessage, maxCharErrorMessage, minCharErrorMessage } from "@backend/errors/errorMessages";
import { z } from "zod";

export const ReducedUserInfoSchema = z.object({
    user: z.object({
        id: z.string().min(1, { message: minCharErrorMessage(1) }).max(50, { message: maxCharErrorMessage(50) }),
        name: z.string().min(1, { message: minCharErrorMessage(1) }).max(50, { message: maxCharErrorMessage(50) }),
        email: z.string().email({ message: emailErrorMessage() }),
        userPersonalData: z.object({
            telefono: z.number().min(1, { message: minCharErrorMessage(1) }).max(50, { message: maxCharErrorMessage(50) }),
            direccionFacturacion: z.string().min(1, { message: minCharErrorMessage(1) }).max(50, { message: maxCharErrorMessage(50) }),
        })
    })
})

export type ReducedUserInfoSchemaType = z.infer<typeof ReducedUserInfoSchema>;