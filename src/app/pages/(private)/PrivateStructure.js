'use client'

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components"

export default function PrivateStructure({ children }) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AppSidebar />

                <SidebarInset>
                    <main className="border border-zinc-800">
                        <SidebarTrigger className="md:hidden mb-4 mt-3 ml-2" />
                        {children}
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}