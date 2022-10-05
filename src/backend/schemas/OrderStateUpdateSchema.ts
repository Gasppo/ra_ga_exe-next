import { z } from "zod";

export const OrderStateUpdateSchema = z.object({
    id: z.string(),
    newStateId: z.number()
})

export type OrderStateUpdateSchemaType = z.infer<typeof OrderStateUpdateSchema>;