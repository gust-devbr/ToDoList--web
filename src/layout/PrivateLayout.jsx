import { Outlet } from "react-router-dom";
import { useState } from "react";
import { FaAngleRight } from '@/components/icons';
import { Sidebar } from "@/components";
import { useTheme } from "@/context";

export default function PrivateLayout() {
    const { theme } = useTheme();
    const [open, setOpen] = useState(false);

    return (
        <>
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                />
            )}

            <aside
                className={`
                fixed top-0 left-0 z-50 h-screen w-64
                transform transition-transform duration-300
                ${open ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0
          `}>
                <Sidebar />
            </aside>

            <button
                onClick={() => setOpen(!open)}
                className={`
                md:hidden fixed top-3 left-4 z-50 p-2 rounded transition-all duration-300
                ${open ? "ml-50 rotate-180" : "ml-0"}
            `}
            >
                <FaAngleRight
                    color={theme.text}
                    size={24}
                />
            </button>

            <main className="md:pl-64 flex-1 min-h-screen min-w-screen">
                <Outlet />
            </main>
        </>
    );
};