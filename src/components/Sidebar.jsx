import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import { FaCog, FaTasks } from 'react-icons/fa';
import { GiNotebook } from 'react-icons/gi';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useTheme();

    const toggleSidebar = () => setIsOpen(!isOpen);

    const linkClass = ({ isActive }) =>
        `block uppercase text-md pb-1 transition flex flex-row gap-2 items-center
        ${isActive
            ? 'text-red-600 border-b-2 border-red-600'
            : 'text-gray-400 hover:text-gray-600'
        }`;

    return (
        <>
            <div
                className="h-screen flex flex-col border-r md:border-r-2 border-zinc-800"
                style={{ background: theme.background }}
            >
                <p className="px-5 py-4 font-bold text-xl border-b-2 border-zinc-800"
                    style={{ color: theme.text }}
                >
                    Listas
                </p>

                <nav className="flex flex-col mt-2 gap-2 px-6 flex-1 md:mb-5 mb-17">
                    <NavLink onClick={toggleSidebar} to="/tasks" className={linkClass}>
                        <FaTasks />
                        Tarefas
                    </NavLink>
                    <NavLink onClick={toggleSidebar} to="/notes" className={linkClass}>
                        <GiNotebook />
                        Notas
                    </NavLink>
                    <div className="mt-auto flex">
                        <NavLink onClick={toggleSidebar} to="/settings" className={linkClass}>
                            <FaCog />
                            Configurações
                        </NavLink>
                    </div>
                </nav>
            </div>
        </>
    );
}
