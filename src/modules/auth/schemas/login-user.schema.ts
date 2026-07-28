import { z } from "zod"

export const loginSchema = z.object({
    email: z
        .email("Insira um e-mail válido")
        .trim(),

    password: z
        .string()
        .min(1, "Insira sua senha")
        .trim(),
})

export type LoginSchemaType = z.infer<typeof loginSchema>