import { api } from "@/lib/api";
import { ApiResponse } from "@/@types/api/ApiResponse";

export async function deleteUser(password: string): Promise<ApiResponse> {
    const res = await api.delete("/private/me", { data: { password } })
    return res.data
}