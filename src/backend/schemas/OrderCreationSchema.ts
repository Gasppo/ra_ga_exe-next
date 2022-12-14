import { Paths } from "@UI/Types/nestedObjTypes";
import { z } from "zod";

export const OrderCreationDataSchema = z.object({
    atributosPrenda: z.object({
        material: z.object({
            selected: z.boolean(),
            observaciones: z.string()
        }),
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
        genero: z.object({
            selected: z.boolean(),
            observaciones: z.string(),
            values: z.array(z.object({
                key: z.string(),
                text: z.string(),
            }))
        }),
    }),
    nombreProducto: z.string(),
    complejidad: z.string(),
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
    "Corte Muestra": z.object({ selected: z.boolean(), }),
    "Confección Muestra": z.object({ selected: z.boolean() }),
    "Ficha Técnica de Consumos": z.object({ selected: z.boolean() }),
    "Digitalización y Progresiones": z.object({ selected: z.boolean() }),
    "Impresión Moldertía Base": z.object({ selected: z.boolean() }),
    "Terminación": z.object({ selected: z.boolean() }),
    "Cotización": z.object({ selected: z.boolean() }),
    "Moldería Base": z.object({ selected: z.boolean() }),
    talles: z.string(),
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
    orderFiles: z.object({
        observaciones: z.string(),
        files: z.array(z.object({
            name: z.string(),
            urlID: z.string(),
            type: z.string()
        }))
    }),
})

export type ValidatedOrderSchema = z.infer<typeof OrderCreationDataSchema>

export type OrderCreationData = ValidatedOrderSchema & { files: { file: File, section: Paths<ValidatedOrderSchema> }[] }