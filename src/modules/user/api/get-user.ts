import { api } from "@/lib/api";

import { UserWithoutPassType } from "../type";

export async function getUser(): Promise<UserWithoutPassType> {
    const { data } = await api.get("/private/me")
    return data.data.user
}