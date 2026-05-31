import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/client/category-sevice"

export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            return await getCategories()
        }
    })
}
