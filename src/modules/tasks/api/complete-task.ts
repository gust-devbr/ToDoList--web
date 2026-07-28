import { api } from "@/lib/api";
import { ApiResponse } from "@/@types/api/ApiResponse";

export async function completeTask(id: string): Promise<ApiResponse> {
    const res = await api.patch(`/private/tasks/${id}/complete`)
    return res.data
}