"use client"

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ChevronDown, LogOut } from "lucide-react"
import { useLogout } from "@/hooks/react-query/user/useLogout"

export function UserOptionPortal() {
    const { logout } = useLogout()

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost">
                    <ChevronDown className="w-5! h-5! text-zinc-500" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-20">
                <Button variant="ghost" className="text-red-500 hover:text-red-600" onClick={logout}>
                    <LogOut className="w-5! h-5!" />
                    Sair
                </Button>
            </PopoverContent>
        </Popover>
    )
};