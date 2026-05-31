"use client"

import { ChartCollapsible } from "@/components/features/home/chart/ChartCollapsible"
import { TaskFilter } from "@/components/features/home/table/TaskFilter"
import { TasksTable } from "@/components/features/home/table/TasksList"
import { AddTask } from "@/components/features/home/form/AddTask"
import { getGreeting } from "@/utils/greeting"
import { useGetUser } from "@/queries/useUser"

export default function HomePage() {
    const greeting = getGreeting()
    const { data: user } = useGetUser()

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
