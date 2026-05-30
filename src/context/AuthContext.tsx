/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useState, useEffect, createContext, useContext, useCallback } from "react";
import { apiFetch } from "@/utils/api";
import { AuthContextType } from "@/types/authContext";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const loadUser = useCallback(async () => {
        try {
            setLoading(true)

            const res = await apiFetch("/private/me")

            if (res.status === 401) {
                await logout()
                return
            }

            setUser(res?.data?.user)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadUser()
    }, [loadUser])

    async function login(email: string, password: string) {
        try {
            return await apiFetch("/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password })
            })
        } catch (error) {
            console.error(error)
        }
    }

    async function register(name: string, email: string, password: string) {
        try {
            return await apiFetch("/auth/register", {
                method: "POST",
                body: JSON.stringify({ name, email, password })
            })
        } catch (error) {
            console.error(error)
        }
    }

    async function logout() {
        await apiFetch("/auth/logout", { method: "POST" })
        setUser(null)
        setTimeout(() => router.replace("/screens/auth"), 700)
    }

    return (
        <AuthContext.Provider value={{ user, loading, loadUser, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth fora do provider")
    return context
};
