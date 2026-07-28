import { api } from "@/lib/api";

import { ApiResponse } from "@/@types/api/ApiResponse";

export async function deleteCategory(id: string): Promise<ApiResponse> {
    const res = await api.delete(`/private/tasks/category/${id}/delete`)
    return res.data
}