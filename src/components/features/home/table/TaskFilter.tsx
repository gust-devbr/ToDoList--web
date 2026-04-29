"use client"

import { cn } from "@/lib/utils"

type Props = {
    filter: string
    setFilter: (value: string) => void
}

export function TaskFilter({ filter, setFilter }: Props) {
    return (
        <div className="flex flex-row gap-7 items-center text-lg md:justify-start justify-between px-8 py-2 border-b-2">
            <button
                onClick={() => setFilter("all")}
                className={cn(
                    "text-zinc-600",
                    filter === "all" && "border-b-2 border-blue-700"
                )}
            >
                Todas
            </button>

            <button
                onClick={() => setFilter("pending")}
                className={cn(
                    "text-zinc-600",
                    filter === "pending" && "border-b-2 border-blue-700"
                )}
            >
                Pendentes
            </button>

            <button
                onClick={() => setFilter("completed")}
                className={cn(
                    "text-zinc-600",
                    filter === "completed" && "border-b-2 border-blue-700"
                )}
            >
                Concluídas
            </button>
        </div>
    )
}