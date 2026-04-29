"use client"

import { Button } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Task } from "@/types/task"
import { ChevronsUpDown } from "lucide-react"
import { useEffect, useState } from "react"
import { StatisticsCards } from "./StatisticsCards"
import { apiFetch } from "@/utils/api"
import { ChartTasks } from "./ChartTasks"

export function ChartCollapsible() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        async function getTasks() {
            try {
                const res = await apiFetch("/private/tasks?status=all")

                if (res.ok) {
                    const data = res?.data?.tasks || res?.tasks || []
                    setTasks(data)
                } else {
                    setTasks([])
                }
            } catch (error) {
                console.error(error)
                setTasks([])
            }
        }

        getTasks()
    }, [])

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="flex flex-col gap-2 border rounded-sm p-3"
        >
            <main className="">
                <header className="flex flex-row-reverse justify-between items-center gap-5">
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                            <ChevronsUpDown />
                        </Button>
                    </CollapsibleTrigger>

                    <div className="flex-1">
                        <StatisticsCards tasks={tasks} />
                    </div>
                </header>

                <CollapsibleContent>
                    <div className="mt-4 w-full">
                        {isOpen && <ChartTasks tasks={tasks} />}
                    </div>
                </CollapsibleContent>
            </main>
        </Collapsible>
    )
}   