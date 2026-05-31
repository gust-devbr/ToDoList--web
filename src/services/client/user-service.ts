import { AuthResponse } from "@/types/authContext";
import { User } from "@/types/user";
import { apiFetch } from "next-lib-utils"

export async function getUser() {
    const res = await apiFetch("/private/me")

    const data: Omit<User, 'password'> | null = res?.data?.user
    return data
}

export async function deleteUser(password: string) {
    return await apiFetch("/private/user/delete-account", {
        method: "DELETE",
        body: JSON.stringify({ password })
    })
}

export async function login(email: string, password: string) {
    const data: AuthResponse = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
    })
    return data
}

export async function register(name: string, email: string, password: string) {
    const data: AuthResponse = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password })
    })
    return data
}

export async function editUser(name: string, email: string) {
    return await apiFetch("/private/user", {
        method: "PUT",
        body: JSON.stringify({
            ...(name && { name }),
            ...(email && { email })
        })
    })
}
