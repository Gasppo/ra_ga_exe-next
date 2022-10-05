import { z } from "zod";

export const OrderStateUpdateSchema = z.object({
    id: z.string(),
    newOrderState: z.string(),
    email: z.string(),
    name: z.string()
})

export type OrderStateUpdateSchemaType = z.infer<typeof OrderStateUpdateSchema>;