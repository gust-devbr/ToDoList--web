import Navbar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function PrivateLayout() {
    return (
        <>
            <aside className="fixed top-0 left-0 z-50 h-screen w-64 text-zinc-100 transform transition-transform duration-300">
                <Navbar />
            </aside>

            <main className="flex-1 pt-4 md:pt-0 px-6 transition-all duration-300">
                <Outlet />
            </main>
        </>
    );
};