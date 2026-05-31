import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addCategory } from "@/services/client/category-sevice"
import { Category } from "@/types/task"

export function useAddCategory() {
    const queryClient = useQueryClient()

    type CreateCategoryType = Omit<Category, 'id'>

    return useMutation({
        mutationFn: async ({ name, color }: CreateCategoryType) => {
            return await addCategory(name, color)
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['categories']
            })
        }
    })
}
