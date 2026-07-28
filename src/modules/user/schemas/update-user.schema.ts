import { z } from "zod"

export const updateUserSchema = z.object({
    name: z
        .string()
        .min(3, "Nome deve ter pelo menos 3 carecteres")
        .max(20, "Nome deve ter no máximo 20 caracteres")
        .trim(),

    email: z
        .email("Insira um e-mail válido")
        .max(20, "E-mail deve ter no máximo 20 caracteres")
        .trim(),
})

export type UpdateUserSchema = z.infer<typeof updateUserSchema>