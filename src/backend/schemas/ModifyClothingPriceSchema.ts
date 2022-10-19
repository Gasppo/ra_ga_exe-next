import { z } from "zod";

export const ModifyClothingPriceSchema = z.object({
    precioBase: z.number().min(1, { message: "Se requiere un precio basico" }),
})

export type ModifyClothingCategorySchemaType = z.infer<typeof ModifyClothingPriceSchema>;
