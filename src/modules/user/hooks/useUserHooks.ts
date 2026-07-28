import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { useAppMutation } from "@/hooks/useAppMutation";

import { QUERY_KEYS } from "@/lib/query-keys";
import { queryClient } from "@/lib/query-client";

import * as api from "../api/index"

export function useUser() {
    return useQuery({
        queryKey: [QUERY_KEYS.user],
        queryFn: api.getUser
    })
}

export function useDeleteUser() {
    const router = useRouter()

    return useAppMutation(api.deleteUser, {
        onSuccess: () => {
            queryClient.setQueryData([QUERY_KEYS.user], null)
            router.refresh()
        }
    })
}

export function useUpdateUser() {
    return useAppMutation(api.updateUser, {
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.user] })
    })
}