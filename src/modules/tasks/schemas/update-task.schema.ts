import { z } from "zod"

export const updateTaskSchema = z.object({
    id: z.string(),

    title: z
        .string()
        .optional(),

    description: z
        .string()
        .optional(),

    categoryId: z
        .string()
        .optional(),
})

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema> & { id: string }
