import { useQueryClient, useMutation } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/query-keys";
import { deleteCategory } from "../api/delete-category";

export function useDeleteCategory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteCategory,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.categories] })
    })
}
