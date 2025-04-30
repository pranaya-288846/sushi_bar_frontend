import {z} from "zod"

export const TableDataSchema = z.object({
    id: z.number(),
    clientName: z.string(),
    numberOfSeats: z.number(),
    hasMembership: z.boolean(),
})

export type TableData = z.infer<typeof TableDataSchema>;