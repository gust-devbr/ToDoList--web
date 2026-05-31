import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUser } from "@/services/query/user-service";

export function useEditUser() {
    const queryClient = useQueryClient()

    type DataEdit = {
        name: string
        email: string
    }

    return useMutation({
        mutationFn: async ({ name, email }: DataEdit) => {
            return await editUser(name, email)
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
        }
    })
}
