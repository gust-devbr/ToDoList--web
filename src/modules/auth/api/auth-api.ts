import { api } from "@/lib/api"

import type { ApiResponse } from "@/@types/api/ApiResponse"

import { LoginSchemaType } from "../schemas/login-user.schema"
import { RegisterSchemaType } from "../schemas/register-user.schema"

export async function login(body: LoginSchemaType): Promise<ApiResponse> {
    const res = await api.post("/auth/login", body)
    return res.data
}

export async function register(body: RegisterSchemaType): Promise<ApiResponse> {
    const res = await api.post("/auth/register", body)
    return res.data
}

export async function logout(): Promise<ApiResponse> {
    const res = await api.post("/auth/logout")
    return res.data
}