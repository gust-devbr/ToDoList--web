"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
    SidebarGroup,
    useSidebar,
} from "@/components/ui/sidebar"
import { Archive, Cog, House, SquareCheckBig } from "lucide-react";
import { UserOptionPortal } from "../portal/UserOptions";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useGetUser } from "@/queries/useUser";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function AppSidebar() {
    const { data: user } = useGetUser()
    const pathname = usePathname()
    const { state } = useSidebar()
    const isCollapsed = state === "collapsed"

    const routes = [
        { name: "Início", href: "/screens/home", icon: House },
        { name: "Arquivadas", href: "/screens/archiveds", icon: Archive },
        { name: "Configurações", href: "/screens/settings", icon: Cog },
    ]

    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarGroup className="space-y-5 mt-4">
                    <div className="flex flex-row items-center gap-3">
                        <SquareCheckBig className="text-blue-700 w-8! h-8! shrink-0" />
                        {!isCollapsed && <span className="text-2xl font-medium">Minhas Tarefas</span>}
                    </div>

                    <Separator />

                    <SidebarMenu className="space-y-2">
                        {routes.map(route => {
                            const Icon = route.icon
                            const isActive = pathname.startsWith(route.href)

                            return (
                                <SidebarMenuItem key={route.href}>
                                    {route.href === "/screens/settings" && <Separator />}
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive}
                                        tooltip={route.name}
                                        className={cn(
                                            "py-5",
                                            isActive && "bg-blue-100 text-blue-600 font-medium hover:bg-blue-100 hover:text-blue-600"
                                        )}
                                    >

                                        <Link href={route.href} className="flex items-center gap-3 w-full">
                                            <Icon className={cn(
                                                "shrink-0",
                                                isCollapsed ? "w-4! h-4!" : "w-5! h-5!",
                                                isActive ? "text-blue-600" : "text-muted-foreground"
                                            )} />
                                            <span className={cn(
                                                "text-[16px]",
                                                !isActive && "text-muted-foreground"
                                            )}>
                                                {route.name}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <div className={cn(
                    "flex items-center transition-all",
                    isCollapsed ? "justify-center" : "justify-between"
                )}>
                    <Avatar className="w-10 h-10 shrink-0">
                        <AvatarImage
                            src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                            alt="user"
                        />
                    </Avatar>

                    {!isCollapsed && (
                        <>
                            <div className="flex flex-col min-w-0 flex-1 mx-2">
                                <p className="text-lg truncate">{user?.name}</p>
                                <p className="text-zinc-500 text-sm truncate">{user?.email}</p>
                            </div>
                            <UserOptionPortal />
                        </>
                    )}
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}