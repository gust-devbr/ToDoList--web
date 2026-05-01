"use client"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../ui/dialog"
import { apiFetch } from "@/utils/api"
import { Input } from "../../../ui/input"
import { useState, useEffect } from "react"
import { TaskProps, UpdateTaskProps } from "@/types/updateTask"
import { toast } from "sonner"
import { Button } from "../../../ui/button"
import { Pencil } from "lucide-react"


export function UpdateTitleModal({ task }: TaskProps) {
    const [updateTask, setUpdateTask] = useState<UpdateTaskProps | null>(null)

    useEffect(() => {
        if (task) {
            setUpdateTask({
                id: task.id,
                title: task.title
            });
        }
    }, [task]);

    async function handleUpdateTask() {
        if (!updateTask) return;

        const data = await apiFetch(`/private/tasks/${task.id}/edit`, {
            method: "PUT",
            body: JSON.stringify({ title: updateTask.title })
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
                    <DialogDescription>Digite o novo título da tarefa</DialogDescription>
                </DialogHeader>

                <Input
                    placeholder="Novo título..."
                    value={updateTask?.title ?? ""}
                    onChange={(e) =>
                        setUpdateTask(prev =>
                            prev ? { ...prev, title: e.target.value } : prev
                        )
                    }
                />

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
