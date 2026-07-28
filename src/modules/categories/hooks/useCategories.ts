import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/query-keys";
import { getCategories } from "../api/get-categories";

export function useCategories() {
    return useQuery({
        queryKey: [QUERY_KEYS.categories],
        queryFn: getCategories
    })
}
