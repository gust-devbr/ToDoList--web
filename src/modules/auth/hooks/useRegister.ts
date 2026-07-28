import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { register } from "../api/auth-api";

export function useRegister() {
    const router = useRouter()

    return useMutation({
        mutationFn: register,
        onSuccess: () => router.refresh()
    })
}