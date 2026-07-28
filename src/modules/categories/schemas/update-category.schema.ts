import { z } from "zod"

export const updateCategorySchema = z.object({
    name: z
        .string()
        .min(1, "Insira um nome para a categoria")
        .optional(),

    color: z
        .string()
        .min(1, "Escolha uma cor")
        .optional()
})

export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>