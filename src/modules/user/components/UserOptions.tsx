"use client"

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

import { ChevronDown, LogOut } from "lucide-react"

import { useLogout } from "@/modules/auth/hooks/useLogout"

export function UserOptions() {
    const logout = useLogout()

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost">
                    <ChevronDown className="w-5! h-5! text-zinc-500" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-20">
                <Button
                    variant="ghost"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => logout.mutateAsync()}
                >
                    <LogOut className="w-5! h-5!" />
                    Sair
                </Button>
            </PopoverContent>
        </Popover>
    )
};