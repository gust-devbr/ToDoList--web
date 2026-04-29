"use client"

import { AddTask } from "@/components/features/home/form/AddTask"
import { ChartCollapsible } from "@/components/features/home/chart/ChartCollapsible"
import { TaskFilter } from "@/components/features/home/table/TaskFilter"
import { TasksTable } from "@/components/features/home/table/TasksList"
import { useAuth } from "@/context/AuthContext"
import { Task } from "@/types/task"
import { apiFetch } from "@/utils/api"
import { getGreeting } from "@/utils/greeting"
import { useCallback, useEffect, useState } from "react"


export default function HomePage() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [filter, setFilter] = useState<string>("all")

    const getTasks = useCallback(async () => {
        try {
            const res = await apiFetch(`/private/tasks?status=${filter}`)
            const data = res?.data?.tasks || res?.tasks || []

            if (res.ok) {
                setTasks(data)
            } else {
                setTasks([])
            }
        } catch (error) {
            console.error(error)
        }
    }, [filter])

    useEffect(() => {
        getTasks()
    }, [getTasks])

    const greeting = getGreeting()
    const { user } = useAuth()


    return (
        <div className="space-y-5 px-5">
            <header className="my-8">
                <h1 className="text-2xl font-semibold">
                    {greeting}, {user ? user?.name : "Usuário"}!
                </h1>
            </header>

            <div>
                <ChartCollapsible />
            </div>

            <div>
                <AddTask reload={getTasks} />
            </div>

            <main className="border p-2 rounded-sm">
                <TaskFilter filter={filter} setFilter={setFilter} />
                <TasksTable tasks={tasks} reload={getTasks} />
            </main>
        </div>
    )
}