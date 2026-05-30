"use client"

import { Button } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from "lucide-react"
import { useState } from "react"
import { StatisticsCards } from "./StatisticsCards"
import { ChartTasks } from "./ChartTasks"
import { useTasks } from "@/hooks/react-query/task/useTask"

export function ChartCollapsible() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { data } = useTasks("all")

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
                        <StatisticsCards tasks={data} />
                    </div>
                </header>

                <CollapsibleContent>
                    <div className="mt-4 w-full">
                        {isOpen && <ChartTasks tasks={data} />}
                    </div>
                </CollapsibleContent>
            </main>
        </Collapsible>
    )
}   