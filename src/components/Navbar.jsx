import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
    const { theme } = useTheme();

    const linkClass = ({ isActive }) => (
        `uppercase text-sm pb-1 transition
        ${isActive ? "text-red-600 border-b-2 border-red-600" : "text-gray-400 hover:text-gray-600"}`
    );

    return (
        <header style={{ background: theme.background }} className='bg-white min-w-screen shadow-sm top-0 left-0 z-50 fixed flex justify-center border-b'>
            <nav className="max-w-7xl mx-auto h-15 px-8 flex items-center justify-between">

                <ul className="flex gap-12">
                    <li>
                        <NavLink to="/tasks" className={linkClass}>
                            Tarefas
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="settings" className={linkClass}>
                            Configurações
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
};