import { z } from "zod";

export const ModifyPreciosServiciosSchema = z.object({
    id: z.string(),
    precioBase: z.number().min(1, { message: "Se requiere un precio basico" }),
    factorMultiplicador: z.number().min(1, { message: "Se requiere un factor multiplicador" }),
})

export type ModifyPreciosServiciosSchemaType = z.infer<typeof ModifyPreciosServiciosSchema>;
