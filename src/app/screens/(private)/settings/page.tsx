"use client"

import { AccountCard } from "@/components/features/settings/card/AccountCard"
import { ThemeCard } from "@/components/features/settings/card/ThemeCard"
import { ThemeSelector } from "@/components/features/settings/card/ThemeSelector"

export default function SettingsPage() {
    return (
        <div className="space-y-5 px-5">
            <header className="my-8">
                <h1 className="text-2xl font-semibold">
                    Configurações
                </h1>
            </header>

            <AccountCard />

            <ThemeCard />
        </div>
    )
}