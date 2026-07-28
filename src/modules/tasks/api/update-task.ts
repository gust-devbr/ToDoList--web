import { api } from "@/lib/api";

import { ApiResponse } from "@/@types/api/ApiResponse";
import { UpdateTaskSchema } from "../schemas/update-task.schema";

export async function udpdateTask(body: UpdateTaskSchema): Promise<ApiResponse> {
    const { id, ...rest } = body
    const res = await api.put(`/private/tasks/${id}/edit`, rest)
    return res.data
}