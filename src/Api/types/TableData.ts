import {z} from "zod"

export const TableDataSchema = z.object({
    tableId: z.number(),
    totalPrice: z.number(),
    clientName: z.string(),
    numberOfSeats: z.number(),
    hasMembership: z.boolean(),
})

export type TableData = z.infer<typeof TableDataSchema>;