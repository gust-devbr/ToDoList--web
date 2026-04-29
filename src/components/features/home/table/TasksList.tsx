"use client"

import { UpdateTitleModal } from "@/components/features/home/modal/UpdateTask"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Task } from "@/types/task"
import { apiFetch } from "@/utils/api"
import { Trash2 } from "lucide-react"
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
        await apiFetch(`/private/tasks/${id}`, { method: "DELETE" })
        setTimeout(() => reload(), 700)
    }

    async function toggleTask(id: string) {
        await apiFetch(`/private/tasks/${id}`, { method: "PATCH" })

        setTaskList(prev =>
            prev.map(task =>
                task.id === id
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
        setTimeout(() => reload(), 700)
    }

    useEffect(() => {
        setTaskList(tasks ?? [])
    }, [tasks])

    return (
        <div className="w-full overflow-x-auto">
            <Table>
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

                            <TableCell className="text-right">
                                <UpdateTitleModal task={task} />

                                <Button variant="ghost" onClick={() => deleteTask(task.id)}>
                                    <Trash2 className="w-5! h-5! text-red-400" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}