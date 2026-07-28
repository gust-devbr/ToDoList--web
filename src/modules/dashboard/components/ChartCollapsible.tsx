"use client"

import { useState } from "react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"

import { StatisticsCards } from "./StatisticsCards"
import { TaskChart } from "@/modules/tasks/components/TaskChart"

import { ChevronsUpDown } from "lucide-react"

import { useTasks } from "@/modules/tasks/hooks/useTaskHooks"

export function ChartCollapsible() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { data: tasks } = useTasks("all")

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
                        {isOpen && <TaskChart tasks={tasks} />}
                    </div>
                </CollapsibleContent>
            </main>
        </Collapsible>
    )
}   