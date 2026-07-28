import { useQueryClient, useMutation } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/query-keys";
import { createCategory } from "../api/create-category";

export function useCreateCategory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createCategory,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.categories] })
    })
}
