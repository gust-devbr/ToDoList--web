'use client'

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import {
    FaChartBar,
    FaCog,
    FaTasks,
    GiNotebook,
    IoMdContact,
} from "@/components/icons";
import { usePathname } from "next/navigation"
import Link from "next/link"

export function AppSidebar() {
    const pathname = usePathname()

    const links = [
        { to: '/pages/tasks', label: 'Tarefas', icon: FaTasks },
        { to: '/pages/notes', label: 'Notas', icon: GiNotebook },
        { to: '/pages/contacts', label: 'Contatos', icon: IoMdContact },
        { to: '/pages/dashboard', label: 'Dashboard', icon: FaChartBar, isFooter: true },
        { to: '/pages/settings', label: 'Configurações', icon: FaCog, isFooter: true }
    ]

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xl py-7">Listas</SidebarGroupLabel>

                    <SidebarMenu>
                        {links.filter(l => !l.isFooter).map(link => {
                            const Icon = link.icon
                            const isActive = pathname === link.to

                            return (
                                <SidebarMenuItem key={link.to}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive}
                                    >
                                        <Link href={link.to}>
                                            <Icon />
                                            <span className="text-lg">{link.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup className="mt-auto">
                    <SidebarMenu>
                        {links.filter(l => l.isFooter).map(link => {
                            const Icon = link.icon
                            const isActive = pathname === link.to

                            return (
                                <SidebarMenuItem key={link.to}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive}
                                    >
                                        <Link href={link.to}>
                                            <Icon />
                                            <span className="text-lg">{link.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>

            </SidebarContent>
        </Sidebar>
    )
};