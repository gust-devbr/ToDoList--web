'use client'

import { api } from "@/components/utils/api";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const router = useRouter()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUser() {
            try {
                const data = await api('/private/me');

                setUser(data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, []);

    async function login(credentials) {
        const data = await api('/public/login', {
            method: "POST",
            body: JSON.stringify(credentials),
        });

        if (!data.ok) throw new Error(data?.error || "Erro no login");
        setUser(data.user);
    };

    async function logout() {
        await api('/public/logout', { method: "POST" });

        setUser(null);
        router.replace("/");
    };

    async function deleteAccount() {
        await api('/api/private/user', { method: "DELETE" });
        setUser(null);
        router.replace("/");
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, deleteAccount }}>
            {children}
        </AuthContext.Provider>
    )
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth fora do provider");
    return context;
};

export { AuthContext };