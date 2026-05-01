/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { TaskOptionsPortal } from "@/components/portal/TaskOptions"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Task } from "@/types/task"
import { apiFetch } from "@/utils/api"
import { darkenColor } from "@/utils/darkenColor"
import { useEffect, useState } from "react"


type TaskTableProps = {
    tasks: Task[],
    reload: () => void
}

const badgeStyle = {
    completed: "bg-green-100 text-green-600",
    pending: "bg-yellow-100 text-yellow-600"
}

export function TasksTable({ tasks, reload }: TaskTableProps) {
    const [taskList, setTaskList] = useState(tasks)

    async function deleteTask(id: string) {
        await apiFetch(`/private/tasks/${id}/delete`, { method: "DELETE" })
        await reload()
    }

    async function toggleTask(id: string) {
        await apiFetch(`/private/tasks/${id}/complete`, { method: "PATCH" })

        setTaskList(prev =>
            prev.map(task =>
                task.id === id
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
        await reload()
    }

    async function archiveTask(id: string) {
        await apiFetch(`/private/tasks/${id}/archive`, { method: "PATCH" })
        await reload()
    }

    useEffect(() => {
        setTaskList(tasks ?? [])
    }, [tasks])

    return (
        <div className="w-full overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-lg">Título</TableHead>
                        <TableHead className="text-lg">Status</TableHead>
                        <TableHead className="text-lg">Categoria</TableHead>
                        <TableHead className="text-right text-lg">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {taskList?.map(task => (
                        <TableRow key={task.id}>
                            <TableCell className="flex flex-row text-xl items-center gap-5 text-right">
                                <Checkbox
                                    className="w-5 h-5"
                                    checked={task.completed}
                                    onCheckedChange={() => toggleTask(task.id)}
                                />
                                <p title={task.title} className="md:text-lg text-sm wrap-break-word sm:max-w-62.5">
                                    {task.title}
                                </p>
                            </TableCell>

                            <TableCell>
                                <Badge
                                    className={cn(
                                        task.completed
                                            ? badgeStyle.completed
                                            : badgeStyle.pending
                                    )}
                                >
                                    {task.completed ? "Concluída" : "Pendente"}
                                </Badge>
                            </TableCell>

                            <TableCell>
                                {task.category && (
                                    <Badge
                                        style={{
                                            backgroundColor: task.category.color,
                                            color: darkenColor(task.category.color, 0.4)
                                        }}
                                    >
                                        {task.category.name}
                                    </Badge>
                                )}
                            </TableCell>

                            <TableCell className="text-right">
                                <TaskOptionsPortal
                                    task={task}
                                    onDelete={() => deleteTask(task.id)}
                                    onArchive={() => archiveTask(task.id)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}