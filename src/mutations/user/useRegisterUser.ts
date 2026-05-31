import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register } from "@/services/client/user-service";

export function useRegisterUser() {
    const queryClient = useQueryClient()

    type RegisterData = {
        name: string
        email: string
        password: string
    }

    return useMutation({
        mutationFn: async ({
            name,
            email,
            password
        }: RegisterData) => {
            return await register(name, email, password)
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
        }
    })
}