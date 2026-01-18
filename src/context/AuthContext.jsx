import { createContext, useContext, useEffect, useState } from "react";
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
            api.defaults.headers.common.Authorization = `Bearer ${token}`;
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    async function login({ token, user }) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user)
    };

    function logout() {
        localStorage.clear();
        api.defaults.headers.common.Authorization = null;
        setUser(null);
    };

    async function deleteAccount() {
        await api.delete("/auth/delete");
        logout();
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