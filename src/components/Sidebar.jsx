import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import { FaAngleRight, FaCog, FaTasks } from 'react-icons/fa';
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
            <button
                onClick={toggleSidebar}
                className={`
                fixed top-4 left-4 z-50 p-2 rounded text-black transition-all duration-300 text-xl
                ${isOpen ? "ml-50 rotate-180" : "ml-0"}
                `}
                style={{ color: theme.text }}
            >
                <FaAngleRight />
            </button>

            <div
                className={`
                top-0 left-0 h-full w-64 z-40 flex flex-col
              bg-white shadow-lg border-r transition-transform duration-300
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
                style={{ background: theme.background }}
            >
                <p style={{ color: theme.text }} className="ml-5 mt-10">
                    Listas
                </p>

                <nav className="flex flex-col mt-2 gap-2 px-6 flex-1 mb-15">
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
