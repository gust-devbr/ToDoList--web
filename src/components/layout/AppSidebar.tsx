"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
    SidebarGroup,
} from "@/components/ui/sidebar"
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarImage } from "../ui/avatar";
import { UserOptionPortal } from "../portal/UserOptions";
import { Cog, House, SquareCheckBig } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Separator } from "../ui/separator";

export function AppSidebar() {
    const { user } = useAuth()
    const pathname = usePathname()

    const routes = [
        { name: "Ínicio", href: "/screens/home", icon: House },
        { name: "Configurações", href: "/screens/settings", icon: Cog },
    ]


    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup className="space-y-5 mt-4">
                    <SidebarGroupLabel className="flex flex-row items-center gap-3 text-2xl">
                        <SquareCheckBig className="text-blue-700 w-8! h-8!" />
                        Minhas Tarefas
                    </SidebarGroupLabel>

                    <Separator />

                    <SidebarMenu>
                        {routes.map(route => {
                            const Icon = route.icon
                            const isActive = pathname.startsWith(route.href)

                            return (
                                <SidebarMenuItem key={route.href}>
                                    <SidebarMenuButton isActive={isActive} className="py-5">
                                        <Link
                                            href={route.href}
                                            className={cn(
                                                "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-[16px] transition-all",
                                                isActive
                                                    ? "bg-blue-100 text-blue-600 font-medium"
                                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                            )}
                                        >
                                            <Icon
                                                className={cn(
                                                    "w-5! h-5!",
                                                    isActive ? "text-blue-600" : "text-muted-foreground"
                                                )}
                                            />
                                            {route.name}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )

                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <main className="flex flex-row justify-between items-center">
                    <section className="flex flex-row gap-2">
                        <Avatar className="w-12 h-12">
                            <AvatarImage
                                src={"https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
                                alt="user"
                            />
                        </Avatar>

                        <div className="flex flex-col">
                            <p className="md:text-xl text-lg">{user?.name}</p>
                            <p className="text-zinc-500 md:text-[16px]">{user?.email}</p>
                        </div>
                    </section>

                    <UserOptionPortal />
                </main>
            </SidebarFooter>
        </Sidebar>
    )
}