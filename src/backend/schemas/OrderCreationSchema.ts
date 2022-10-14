import { Paths } from "@UI/Types/nestedObjTypes";
import { z } from "zod";

export const OrderCreationDataSchema = z.object({
    atributosPrenda: z.object({
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
        elastico: z.object({
            selected: z.boolean(),
            cantidad: z.number(),
            observaciones: z.string()
        }),
        manga: z.object({
            selected: z.boolean(),
            observaciones: z.string()
        }),
    }),
    cliente: z.string(),
    geometral: z.object({
        selected: z.boolean(),
        observaciones: z.string(),
        files: z.array(z.object({
            name: z.string(),
            urlID: z.string(),
            type: z.string()
        }))
    }),
    logoMarca: z.object({
        selected: z.boolean(),
        observaciones: z.string(),
        files: z.array(z.object({
            name: z.string(),
            urlID: z.string(),
            type: z.string()
        }))
    }),

    molderiaBase: z.object({
        selected: z.boolean(),
        observaciones: z.string(),
        files: z.array(z.object({
            name: z.string(),
            urlID: z.string(),
            type: z.string()
        }))
    }),
    talles: z.object({
        selected: z.boolean(),
        talle: z.array(z.object({
            nombre: z.string(),
            medidas: z.string()
        }))
    }),
    cantidad: z.string(),
    tipoPrenda: z.object({
        id: z.string().cuid(),
        name: z.string().min(1, { message: 'El nombre de la prenda no puede estar vacío' }),
        picture: z.string().optional()
    }),
    user: z.object({
        name: z.string(),
        email: z.string().email(),
    }),
})

export type ValidatedOrderSchema = z.infer<typeof OrderCreationDataSchema>

export type OrderCreationData = ValidatedOrderSchema & { files: { file: File, section: Paths<ValidatedOrderSchema> }[] }