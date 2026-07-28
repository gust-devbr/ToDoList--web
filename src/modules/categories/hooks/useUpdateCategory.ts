import { useQueryClient, useMutation } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/query-keys";
import { updateCategory } from "../api/update-category";

export function useUpdateCategory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateCategory,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.categories] })
    })
}
