'use client'

import { FaChartBar, FaCog, FaTasks, GiNotebook, IoMdContact } from '@/components/icons';
import { useTheme } from '@/context';
import { usePathname } from 'next/navigation';
import Link from 'next/link'

export function Sidebar() {
    const pathname = usePathname();
    const { theme } = useTheme();

    const links = [
        { to: '/pages/tasks', label: 'Tarefas', icon: <FaTasks /> },
        { to: '/pages/notes', label: 'Notas', icon: <GiNotebook /> },
        { to: '/pages/contacts', label: 'Contatos', icon: <IoMdContact /> },
        { to: '/pages/dashboard', label: 'Dashboard', icon: <FaChartBar />, isFooter: true },
        { to: '/pages/settings', label: 'Configurações', icon: <FaCog />, isFooter: true }
    ];

    const getLinkClass = (path) => {
        const isActive = pathname === path

        return `block uppercase text-md pb-1 transition flex flex-row gap-2 items-center
        ${isActive
                ? 'text-red-600 border-b-2 border-red-600'
                : 'text-gray-400 hover:text-gray-600'
            }`
    };

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
                        <Link key={link.to} href={link.to} >
                            <div className={getLinkClass(link.to)}>
                                {link.icon}
                                {link.label}
                            </div>
                        </Link>
                    ))}

                    <div className="mt-auto flex flex-col gap-1">
                        {links.filter(l => l.isFooter).map(link => (
                            <Link key={link.to} href={link.to} >
                                <div className={getLinkClass(link.to)}>
                                    {link.icon}
                                    {link.label}
                                </div>
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>
        </>
    )
};