import { z } from "zod"

export const createCategorySchema = z.object({
    name: z
        .string()
        .min(1, "Insira um nome para a categoria")
        .trim(),

    color: z
        .string()
        .min(1, "Escolha uma cor")
        .trim()
})

export type CreateCategorySchema = z.infer<typeof createCategorySchema>