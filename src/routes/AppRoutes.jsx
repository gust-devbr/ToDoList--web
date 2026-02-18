import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

//PAGES
import Login from '../app/(auth)/Login';
import Cadastro from '../app/(auth)/Cadastro';
import Tasks from '../app/(private)/Tasks';
import Notes from "../app/(private)/Notes";
import Settings from '../app/(private)/Settings';
import Contacts from "@/app/(private)/Contacts";

import PrivateLayout from "../layout/PrivateLayout";

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
                        <Route path="/settings" element={<Settings />} />
                        <Route path="*" element={<Navigate to="/tasks" />} />
                    </Route>
                </>
            )}
        </Routes>
    )
};