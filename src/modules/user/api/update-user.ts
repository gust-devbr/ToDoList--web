import { api } from "@/lib/api";
import { ApiResponse } from "@/@types/api/ApiResponse";

import { UpdateUserSchema } from "../schemas/update-user.schema";

export async function updateUser(body: UpdateUserSchema): Promise<ApiResponse> {
    const res = await api.put("/private/me", body)
    return res.data
}