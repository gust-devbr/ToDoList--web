import { api } from "@/lib/api";

import type { CreateTaskSchema } from "../schemas/create-task.schema";
import type { ApiResponse } from "@/@types/api/ApiResponse";

export async function createTask(body: CreateTaskSchema): Promise<ApiResponse> {
    const res = await api.post("/private/tasks", body)
    return res.data
}