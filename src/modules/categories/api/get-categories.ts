import { api } from "@/lib/api";

import { CategoriesResponse } from "../types";

export async function getCategories(): Promise<CategoriesResponse[]> {
    const { data } = await api.get("/private/tasks/category")
    return data.data.categories
}