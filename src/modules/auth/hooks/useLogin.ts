import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { login } from "../api/auth-api";

export function useLogin() {
    const router = useRouter()

    return useMutation({
        mutationFn: login,
        onSuccess: () => router.refresh()
    })
}