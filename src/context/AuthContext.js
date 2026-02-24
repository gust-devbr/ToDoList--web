'use client'

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
                const res = await fetch('/api/private/me', {
                    credentials: "include",
                });
                const data = await res.json();

                if (!res.ok) {
                    setUser(null);
                } else {
                    setUser(data);
                }
            } catch {
                setUser(null);
            } finally {
                setLoading(false)
            }
        }

        loadUser();
    }, []);

    async function login(credentials) {
        const res = await fetch('/api/public/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(credentials),
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data?.error || "Erro no login");
        setUser(data.user);
    };

    async function logout() {
        await fetch('/api/public/logout', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        setUser(null);
        router.replace("/");
    };

    async function deleteAccount() {
        await fetch('/api/private/user', {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
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