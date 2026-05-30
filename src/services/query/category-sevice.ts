import { Category } from "@/types/task";
import { apiFetch } from "@/utils/api";

export async function getCategories() {
    const res = await apiFetch("/private/tasks/category")
    const data: Category[] = res?.data?.categories ?? res?.categories ?? []
    return data
}

export async function addCategory(name: string, color: string) {
    return await apiFetch("/private/tasks/category", {
        method: "POST",
        body: JSON.stringify({ name, color })
    })
}

export async function deleteCategory(id: string) {
    await apiFetch(`/private/tasks/category/${id}/delete`, { method: "DELETE" })
}