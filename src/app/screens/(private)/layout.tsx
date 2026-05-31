"use client"

import { AppSidebar } from "@/components/layout/AppSidebar"
import { Header } from "@/components/layout/Header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useGetUser } from "@/hooks/react-query/user/useGetUser"
import { useLogout } from "@/hooks/react-query/user/useLogout"
import { ThemeProvider } from "next-themes"
import { ReactNode, useEffect } from "react"

export default function PrivateLayout({ children }: { children: ReactNode }) {
    const { isError } = useGetUser()
    const { logout } = useLogout()

    useEffect(() => {
        if (isError) {
            logout()
        }
    }, [isError])

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TooltipProvider>
                <SidebarProvider>
                    <div className="flex min-h-screen w-full">
                        <AppSidebar />
                        <SidebarInset>
                            <main className="h-full">
                                <Header />
                                {children}
                            </main>
                        </SidebarInset>
                    </div>
                </SidebarProvider>
            </TooltipProvider>
        </ThemeProvider>
    )
}