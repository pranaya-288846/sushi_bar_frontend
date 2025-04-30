import {z} from "zod"

export const OrderDataSchema = z.object({
    id: z.number(),
    menuItemId: z.number(),
    tableId: z.number(),
    status: z.string()
})

export type OrderData = z.infer<typeof OrderDataSchema>;