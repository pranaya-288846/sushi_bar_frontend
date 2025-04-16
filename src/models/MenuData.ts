import {z} from "zod"

export const MenuDataSchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    description: z.string(),
    availability: z.string(),
    imageUrl: z.string(),
})

export type MenuData = z.infer<typeof MenuDataSchema>;