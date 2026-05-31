"use client"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useLogout } from "@/mutations/user/useLogout"
import { Header } from "@/components/layout/Header"
import { useGetUser } from "@/queries/useUser"
import { ReactNode, useEffect } from "react"
import { ThemeProvider } from "next-themes"

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