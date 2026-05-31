import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/query/user-service";

export function useGetUser() {
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            return await getUser()
        },
        retry: false,
    })
}