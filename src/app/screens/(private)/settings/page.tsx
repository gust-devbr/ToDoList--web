import { CategoryCard } from "@/modules/categories/components/CategoryCard"
import { SecurityCard } from "@/modules/settings/components/account/SecurityCard"
import { AccountCard } from "@/modules/settings/components/account/AccountCard"
import { ThemeCard } from "@/modules/settings/components/theme/ThemeCard"

export default function SettingsPage() {
    return (
        <div className="space-y-5 px-5">
            <header className="my-8">
                <h1 className="text-2xl font-semibold">
                    Configurações
                </h1>
            </header>

            <main className="flex md:flex-row flex-col md:justify-between gap-4">
                <AccountCard />
                <CategoryCard />
            </main>

            <footer className="flex md:flex-row flex-col gap-4">
                <div className="flex-1">
                    <ThemeCard />
                </div>
                <div className="flex-1">
                    <SecurityCard />
                </div>
            </footer>
        </div>
    )
}
