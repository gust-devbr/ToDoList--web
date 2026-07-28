import { api } from "@/lib/api";
import { ApiResponse } from "@/@types/api/ApiResponse";

export async function archiveTask(id: string): Promise<ApiResponse> {
    const res = await api.patch(`/private/tasks/${id}/archive`)
    return res.data
}