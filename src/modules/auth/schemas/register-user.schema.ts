import { z } from "zod"

export const registerSchema = z.object({
    name: z
        .string()
        .min(3, "Nome deve ter pelo menos 3 carecteres")
        .max(20, "Nome deve ter no máximo 20 caracteres")
        .trim(),

    email: z
        .email("Insira um e-mail válido")
        .max(20, "E-mail deve ter no máximo 20 caracteres")
        .trim(),

    password: z
        .string()
        .min(6, "Senha deve ter pelo menos 6 carecteres")
        .max(50, "Senha deve ter no máximo 50 caracteres")
})

export type RegisterSchemaType = z.infer<typeof registerSchema>