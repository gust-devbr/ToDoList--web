"use client"

import { AddTask } from "@/components/features/home/form/AddTask"
import { ChartCollapsible } from "@/components/features/home/chart/ChartCollapsible"
import { TasksTable } from "@/components/features/home/table/TasksList"
import { useAuth } from "@/context/AuthContext"
import { getGreeting } from "@/utils/greeting"
import { TaskFilter } from "@/components/features/home/table/TaskFilter"

export default function HomePage() {
    const greeting = getGreeting()
    const { user } = useAuth()

    return (
        <div className="space-y-5 px-5">
            <header className="my-8">
                <h1 className="text-2xl font-semibold">
                    {greeting}, {user ? user?.name : "Usuário"}!
                </h1>
            </header>

            <section>
                <ChartCollapsible />
                <AddTask />
            </section>

            <main className="border p-2 rounded-sm">
                <TaskFilter />
                <TasksTable />
            </main>
        </div>
    )
}
