import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/services/query/user-service";

export function useLoginUser() {
    const queryClient = useQueryClient()

    type LoginData = {
        email: string
        password: string
    }

    return useMutation({
        mutationFn: async ({
            email,
            password
        }: LoginData) => {
            return await login(email, password)
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
        }
    })
}