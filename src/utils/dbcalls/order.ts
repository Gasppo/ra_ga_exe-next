import { z } from "zod";

export const OrderCreationDataSchema = z.object({
    bolsillos: z.object({
        selected: z.boolean(),
        cantidad: z.number(),
        observaciones: z.string()
    }),
    botones: z.object({
        selected: z.boolean(),
        cantidad: z.number(),
        observaciones: z.string()
    }),
    cierre: z.object({
        selected: z.boolean(),
        observaciones: z.string()
    }),
    cliente: z.string(),
    elastico: z.object({
        selected: z.boolean(),
        metros: z.number(),
        observaciones: z.string()
    }),
    geometral: z.object({
        selected: z.boolean(),
        observaciones: z.string()
    }),
    logoMarca: z.object({
        selected: z.boolean(),
        observaciones: z.string()
    }),
    manga: z.object({
        selected: z.boolean(),
        observaciones: z.string()
    }),
    molderiaBase: z.object({
        selected: z.boolean(),
        observaciones: z.string()
    }),
    talles: z.object({
        selected: z.boolean(),
        talle: z.array(z.object({
            nombre: z.string(),
            medidas: z.string()
        }))
    }),
    tipoPrenda: z.object({
        id: z.string().uuid().optional(),
        name: z.string(),
        picture: z.string().optional()
    }),
    user: z.object({
        name: z.string(),
        email: z.string().email(),
        image: z.string()
    }),
})
