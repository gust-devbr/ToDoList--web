import { StatusType } from "@/types/task";
import { Task } from "@/types/task";
import { apiFetch } from "next-lib-utils";

export async function getTasks(status: StatusType) {
    const res = await apiFetch(`/private/tasks?status=${status}`)
    const data: Task[] = res?.data?.tasks || res?.tasks || []
    return data
}

export async function createTask(
    title: string,
    categoryId: string
) {
    const data = await apiFetch("/private/tasks", {
        method: "POST",
        body: JSON.stringify({ title, categoryId })
    })
    return data
}

export async function archiveTask(id: string) {
    await apiFetch(`/private/tasks/${id}/archive`, { method: "PATCH" })
}

export async function editTask(
    id: string,
    title: string,
    categoryId: string
) {
    await apiFetch(`/private/tasks/${id}/edit`, {
        method: "PUT",
        body: JSON.stringify({
            ...(title && { title }),
            ...(categoryId && { categoryId })
        })
    })
}

export async function deleteTask(id: string) {
    await apiFetch(`/private/tasks/${id}/delete`, { method: "DELETE" })
}

export async function toggleTask(id: string) {
    await apiFetch(`/private/tasks/${id}/complete`, { method: "PATCH" })
}