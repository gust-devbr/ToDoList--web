"use client"

import { ThemeSelector } from "./ThemeSelector"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ThemeCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Aparência</CardTitle>
                <CardDescription>Escolha a aparência do aplicativo</CardDescription>
            </CardHeader>

            <CardContent>
                <ThemeSelector />
            </CardContent>
        </Card>
    )
}