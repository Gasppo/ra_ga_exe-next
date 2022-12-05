import { z } from "zod";

export const ProcessUpdateResourcesSchema = z.object({
    id: z.string(),
    recursos: z.array(z.object({
        key: z.string(),
        text: z.string()
    })),
    icon: z.string(),
    proceso: z.string(),
});

export type ProcessUpdateSchemaType = z.infer<typeof ProcessUpdateResourcesSchema>;