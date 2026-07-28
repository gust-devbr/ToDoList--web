import { api } from "@/lib/api";

import type { CreateCategorySchema } from "../schemas/create-category.schema";
import { ApiResponse } from "@/@types/api/ApiResponse";

export async function createCategory(body: CreateCategorySchema): Promise<ApiResponse> {
    const res = await api.post("/private/tasks/category", body)
    return res.data
}