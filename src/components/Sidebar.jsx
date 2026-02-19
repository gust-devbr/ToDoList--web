import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FaChartBar, FaCog, FaTasks } from 'react-icons/fa';
import { GiNotebook } from 'react-icons/gi';
import { IoMdContact } from "react-icons/io";

export default function Sidebar() {
    const { theme } = useTheme();

    const links = [
        { to: '/tasks', label: 'Tarefas', icon: <FaTasks /> },
        { to: '/notes', label: 'Notas', icon: <GiNotebook /> },
        { to: '/contacts', label: 'Contatos', icon: <IoMdContact /> },
        { to: '/dashboard', label: 'Dashboard', icon: <FaChartBar />, isFooter: true },
        { to: '/settings', label: 'Configurações', icon: <FaCog />, isFooter: true }
    ];

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
                    {links.filter(l => !l.isFooter).map(link => (
                        <NavLink key={link.to} to={link.to} className={linkClass}>
                            {link.icon}
                            {link.label}
                        </NavLink>
                    ))}

                    <div className="mt-auto flex flex-col gap-1">
                        {links.filter(l => l.isFooter).map(link => (
                            <NavLink key={link.to} to={link.to} className={linkClass}>
                                {link.icon}
                                {link.label}
                            </NavLink>
                        ))}
                    </div>
                </nav>
            </div>
        </>
    )
};