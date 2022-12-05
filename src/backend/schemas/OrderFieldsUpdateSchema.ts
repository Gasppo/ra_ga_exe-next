import { z } from "zod";

export const OrderFieldsUpdateSchema = z.object({
    orderId: z.string(),
    precioPrendaId: z.string(),
});

export type OrderFieldsUpdateSchemaType = z.infer<typeof OrderFieldsUpdateSchema>;