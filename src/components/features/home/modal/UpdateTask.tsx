"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { apiFetch } from "@/utils/api"
import { Input } from "../../../ui/input"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Button } from "../../../ui/button"
import { Pencil } from "lucide-react"
import { SelectCategory } from "../form/SelectCategory"
import { Task } from "@/types/task"

type TaskProps = Pick<Task, 'id' | 'title' | 'category'>

export function UpdateTitleModal({ task }: { task: TaskProps }) {
    const [updateTask, setUpdateTask] = useState<Omit<TaskProps, 'category'> | null>(null)
    const [categoryId, setCategoryId] = useState<string | null>(null)

    useEffect(() => {
        if (task) {
            setUpdateTask({
                id: task.id,
                title: task.title
            });
            setCategoryId(task?.category?.id)
        }
    }, [task]);

    async function handleUpdateTask() {
        if (!updateTask) return;

        const { title } = updateTask

        const data = await apiFetch(`/private/tasks/${task.id}/edit`, {
            method: "PUT",
            body: JSON.stringify({
                ...(title && { title }),
                ...(categoryId && { categoryId })
            })
        })

        if (data.ok) {
            toast.success(data.message)
            setTimeout(() => window.location.reload(), 900);
            setUpdateTask(null)
        } else {
            toast.error(data.message)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <Pencil className="w-5! h-5!" />
                    Editar
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl">Editar Tarefa</DialogTitle>
                    <DialogDescription>Digite o novo título ou categoria da tarefa</DialogDescription>
                </DialogHeader>

                <div className="space-y-3">
                    <Input
                        placeholder="Novo título..."
                        value={updateTask?.title ?? ""}
                        onChange={(e) =>
                            setUpdateTask(prev =>
                                prev ? { ...prev, title: e.target.value } : prev
                            )
                        }
                    />
                    <SelectCategory value={categoryId} onChange={setCategoryId} />
                </div>

                <DialogFooter>
                    <DialogClose>
                        <Button className="w-full">Cancelar</Button>
                    </DialogClose>

                    <Button onClick={handleUpdateTask}>
                        Salvar
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}
