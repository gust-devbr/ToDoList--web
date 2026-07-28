import { ThemeProvider } from "next-themes"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

import { Header } from "@/components/layout/Header"

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
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
