import { z } from "zod"

export const deleteUserSchema = z.object({
    password: z
        .string()
        .min(1, "Insira sua senha")
        .trim(),

    confirmPassword: z.string(),

}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
})

export type DeleteUserSchema = z.infer<typeof deleteUserSchema>