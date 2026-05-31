import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/services/query/user-service";

export function useDeleteUser() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (password: string) => deleteUser(password),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
        }
    })
}