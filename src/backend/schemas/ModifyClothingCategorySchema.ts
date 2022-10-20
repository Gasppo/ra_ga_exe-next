import { z } from "zod";

export const ModifyClothingCategorySchema = z.object({
    id: z.string(),
    name: z.string().min(1, { message: "Se requiere un nombre" }),
    picture: z.string().min(1, { message: "Se requiere una imagen" }),
})

export type ModifyClothingCategorySchemaType = z.infer<typeof ModifyClothingCategorySchema>;
