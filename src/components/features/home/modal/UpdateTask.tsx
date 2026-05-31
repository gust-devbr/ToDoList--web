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
import { useUpdateTask } from "@/mutations/task/useUpdateTask"
import { SelectCategory } from "../form/SelectCategory"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { Pencil } from "lucide-react"
import { Task } from "@/types/task"
import { toast } from "sonner"

type TaskProps = Pick<Task, 'id' | 'title' | 'category'>

export function UpdateTitleModal({ task }: { task: TaskProps }) {
    const [updateTask, setUpdateTask] = useState<Omit<TaskProps, 'category'> | null>(null)
    const [categoryId, setCategoryId] = useState<string | null>(null)

    const [open, setOpen] = useState<boolean>(false)

    const editTask = useUpdateTask()

    useEffect(() => {
        if (task) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUpdateTask({
                id: task.id,
                title: task.title
            });
            setCategoryId(task?.category?.id)
        }
    }, [task]);

    async function handleUpdateTask() {
        if (!updateTask) return;

        editTask.mutate({
            id: updateTask.id,
            title: updateTask.title,
            categoryId: categoryId ?? ""
        })

        if (editTask.isError) {
            toast.error("ERROR")
        } else {
            toast.success("TAREFA EDITADA")
            setUpdateTask(null)
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
