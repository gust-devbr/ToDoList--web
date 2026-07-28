import { api } from "@/lib/api";

import { ApiResponse } from "@/@types/api/ApiResponse";

export async function deleteTask(id: string): Promise<ApiResponse> {
    const res = await api.delete(`/private/tasks/${id}/delete`)
    return res.data
}