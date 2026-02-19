import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from '@/context/AuthContext';

import { Login, Cadastro } from '@/app/(auth)';
import { Tasks, Notes, Settings, Contacts, Dashboard } from '@/app/(private)'

import PrivateLayout from "@/layout/PrivateLayout";

export default function AppRoutes() {
    const { user, loading } = useAuth();

    if (loading) return <p>Carregando...</p>;

    return (
        <Routes>
            {!user && (
                <>
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="*" element={<Navigate to='/login' />} />
                </>
            )}
            {user && (
                <>
                    <Route element={<PrivateLayout />}>
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path="/notes" element={<Notes />} />
                        <Route path="/contacts" element={<Contacts />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="*" element={<Navigate to="/tasks" />} />
                    </Route>
                </>
            )}
        </Routes>
    )
};