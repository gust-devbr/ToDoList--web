import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import Login from '../app/(auth)/Login';
import Cadastro from '../app/(auth)/Cadastro';
import Tasks from '../app/(private)/Tasks';
import Settings from '../app/(private)/Settings';

import PrivateLayout from "../layout/PrivateLayout";

export default function AppRoutes() {
    const { user, loading } = useAuth();

    if (loading) return <p>Carregando...</p>;

    return (
        <Routes>
            {!user ? (
                <>
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="*" element={<Navigate to='/login' />} />
                </>
            ) : (
                <>
                    <Route element={<PrivateLayout />}>
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="*" element={<Navigate to="/tasks" />} />
                    </Route>
                </>
            )}
        </Routes>
    )
};