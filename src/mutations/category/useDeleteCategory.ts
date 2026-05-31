import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCategory } from "@/services/client/category-sevice"

export function useDeleteCategory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => deleteCategory(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['categories']
            })
        }
    })
}
