"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { TaskOptionsPortal } from "@/components/portal/TaskOptions"
import { useArchiveTask } from "@/mutations/task/useArchiveTask"
import { useToggleTask } from "@/mutations/task/useToggleTask"
import { useDeleteTask } from "@/mutations/task/useDeleteTask"
import { useFilterStore } from "@/store/useFilterStore"
import { Checkbox } from "@/components/ui/checkbox"
import { darkenColor } from "@/utils/darkenColor"
import { Badge } from "@/components/ui/badge"
import { useTasks } from "@/queries/useTask"
import { cn } from "@/lib/utils"

const badgeStyle = {
    completed: "bg-green-100 text-green-600",
    pending: "bg-yellow-100 text-yellow-600"
}

export function TasksTable() {
    const { filter } = useFilterStore()

    const { data: taskList } = useTasks(filter)
    const toggleTask = useToggleTask()
    const archiveTask = useArchiveTask()
    const deleteTask = useDeleteTask()

    return (
        <div className="w-full overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="md:text-lg"></TableHead>
                        <TableHead className="md:text-lg">Título</TableHead>
                        <TableHead className="md:text-lg">Status</TableHead>
                        <TableHead className="md:text-lg">Categoria</TableHead>
                        <TableHead className="text-right md:text-lg">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {taskList?.map(task => (
                        <TableRow key={task.id}>
                            <TableCell>
                                <Checkbox
                                    className="w-5 h-5"
                                    checked={task.completed}
                                    onCheckedChange={() => toggleTask.mutate(task.id)}
                                />
                            </TableCell>

                            <TableCell>
                                <p title={task.title} className="md:text-lg text-sm sm:max-w-62.5 md:max-w-120 max-w-40  whitespace-normal wrap-break-word text-left">
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
                                    onDelete={() => deleteTask.mutate(task.id)}
                                    onArchive={() => archiveTask.mutate(task.id)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}