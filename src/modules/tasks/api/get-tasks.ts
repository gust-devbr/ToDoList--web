import { api } from "@/lib/api";

import type { TaskResponse, StatusType } from "../types";

export async function getTasks(status: StatusType): Promise<TaskResponse[]> {
    const { data } = await api.get(`/private/tasks?status=${status ?? "all"}`)
    return data.data.tasks
}