'use client'

import { AppSidebar } from "@/components/layout/AppSidebar"
import { Header } from "@/components/layout/Header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useAuth } from "@/context/AuthContext"
import { ThemeProvider } from "next-themes"
import React, { useEffect } from "react"

export default function PrivateLayout({ children }: { children: React.ReactNode }) {

    const { loadUser } = useAuth()

    useEffect(() => {
        setTimeout(() => loadUser(), 500)
    }, [loadUser])

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