/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
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
    const greeting = getGreeting()
    const { user } = useAuth()

    const [tasks, setTasks] = useState<Task[]>([])
    const [filter, setFilter] = useState<string>("all")
    const [reload, setReload] = useState<number>(0)

    const reloadAllTasks = () => setReload(prev => prev + 1)

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
    }, [reload, filter])

    return (
        <div className="space-y-5 px-5">
            <header className="my-8">
                <h1 className="text-2xl font-semibold">
                    {greeting}, {user ? user?.name : "Usuário"}!
                </h1>
            </header>

            <div>
                <ChartCollapsible onReload={reloadAllTasks} />
            </div>

            <div>
                <AddTask reload={reloadAllTasks} />
            </div>

            <main className="border p-2 rounded-sm">
                <TaskFilter filter={filter} setFilter={setFilter} />
                <TasksTable tasks={tasks} reload={reloadAllTasks} />
            </main>
        </div>
    )
}