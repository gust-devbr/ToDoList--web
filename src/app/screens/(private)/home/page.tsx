"use client"

import { ChartCollapsible } from "@/modules/dashboard/components/ChartCollapsible"
import { TaskFilter } from "@/modules/tasks/components/TaskFilter"
import { TasksTable } from "@/modules/tasks/components/TasksList"
import { CreateTaskForm } from "@/modules/tasks/components/CreateTaskForm"

import { getGreeting } from "@/utils/greeting"

import { useUser } from "@/modules/user/hooks/useUserHooks"

export default function HomePage() {
    const greeting = getGreeting()
    const { data: user } = useUser()

    return (
        <div className="space-y-5 px-5">
            <header className="my-8">
                <h1 className="text-2xl font-semibold">
                    {greeting}, {user ? user?.name : "Usuário"}!
                </h1>
            </header>

            <section>
                <ChartCollapsible />
                <CreateTaskForm />
            </section>

            <main className="border p-2 rounded-sm">
                <TaskFilter />
                <TasksTable />
            </main>
        </div>
    )
}
