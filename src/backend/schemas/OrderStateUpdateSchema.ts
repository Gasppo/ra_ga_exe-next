import { z } from "zod";

export const OrderStateUpdateSchema = z.object({
    id: z.string(),
    newOrderState: z.string()
})

export type OrderStateUpdateSchemaType = z.infer<typeof OrderStateUpdateSchema>;