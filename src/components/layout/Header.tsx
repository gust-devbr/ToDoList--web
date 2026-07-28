"use client"

import { useEffect, useState } from "react"

import { useTheme } from "next-themes"

import { Card, CardContent } from "../ui/card"
import { SidebarTrigger } from "../ui/sidebar"
import { Button } from "../ui/button"

import { Moon, Sun } from "lucide-react"

export function Header() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState<boolean>(false);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <Card className="flex flex-row justify-between w-full">
            <SidebarTrigger className="ml-2 mt-2" />

            <CardContent className="flex justify-end items-center p-5 h-10">
                <div className="max-w-100 flex flex-row justify-between items-center gap-5">
                    <Button variant="ghost" onClick={toggleTheme}>
                        {theme === "dark" ? <Sun /> : <Moon />}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
