import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "next-lib-utils";

export function useLogout() {
    const router = useRouter()
    const queryClient = useQueryClient()

    async function logout() {
        try {
            await apiFetch("/auth/logout", { method: "POST" })
            queryClient.clear()

            router.replace("/screens/login")
        } catch (error) {
            console.error(error)
        }
    }

    return { logout }
}