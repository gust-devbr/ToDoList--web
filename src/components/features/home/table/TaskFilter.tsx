"use client"

import { cn } from "@/lib/utils"

export type StatusType = 'all' | 'pending' | 'completed'

type Props = {
    filter: StatusType
    setFilter: (value: StatusType) => void
}

const config: {
    label: string,
    status: StatusType
}[] = [
        { label: "Todas", status: "all" },
        { label: "Pendentes", status: "pending" },
        { label: "Concluídas", status: "completed" },
    ]

export function TaskFilter({ filter, setFilter }: Props) {
    return (
        <div className="flex flex-row gap-7 items-center text-lg md:justify-start justify-between px-8 py-2 border-b-2">
            {config.map(c => (
                <button
                    key={c.status}
                    onClick={() => setFilter(c.status)}
                    className={cn(
                        "text-zinc-600",
                        filter === c.status && "border-b-2 border-blue-700"
                    )}
                >
                    {c.label}
                </button>
            ))}
        </div>
    )
}