import { z } from "zod";

export const NewClothingCategorySchema = z.object({
    name: z.string().min(1, { message: "Se requiere un nombre" }),
    picture: z.string().min(1, { message: "Se requiere una imagen" }),
    precioBasico: z.number().min(1, { message: "Se requiere un precio basico" }),
    precioMedio: z.number().min(1, { message: "Se requiere un precio medio" }),
    precioComplejo: z.number().min(1, { message: "Se requiere un precio complejo" }),
    precioMuyComplejo: z.number().min(1, { message: "Se requiere un precio muy complejo" }),
    precioUltraComplejo: z.number().min(1, { message: "Se requiere un precio ultra complejo" }),
    precioExtremadamenteComplejo: z.number().min(1, { message: "Se requiere un precio extremadamente complejo" }),
})

export type NewClothingCategorySchemaType = z.infer<typeof NewClothingCategorySchema>;
