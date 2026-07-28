import { api } from "@/lib/api";

import type { UpdateCategorySchema } from "../schemas/update-category.schema";
import { ApiResponse } from "@/@types/api/ApiResponse";

export async function updateCategory(
    body: UpdateCategorySchema & { id: string }
): Promise<ApiResponse> {

    const { id, ...rest } = body

    const res = await api.put(`/private/tasks/category/${id}/edit`, rest)
    return res.data
}