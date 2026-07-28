"use client"

import { useState, useEffect } from "react"

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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

import { SelectCategory } from "../../categories/components/SelectCategory"

import { Pencil } from "lucide-react"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { UpdateTaskSchema, updateTaskSchema } from "@/modules/tasks/schemas/update-task.schema"
import { useUpdateTask } from "@/modules/tasks/hooks/useTaskHooks"
import { TaskResponse } from "@/modules/tasks/types"

import { getErrorMessage } from "@/utils/get-error-message"

export function UpdateTaskModal({ task }: { task: TaskResponse }) {
    const [open, setOpen] = useState<boolean>(false)

    const updateTask = useUpdateTask()

    const {
        reset,
        control,
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
    } = useForm<UpdateTaskSchema>({
        resolver: zodResolver(updateTaskSchema)
    })

    useEffect(() => {
        if (task) {
            reset({
                id: task.id,
                title: task.title,
                ...(task.categoryId && { categoryId: task.categoryId })
            })
        }
    }, [task, reset]);

    async function onSubmit(data: UpdateTaskSchema) {
        try {
            const res = await updateTask.mutateAsync(data)

            if (res.success) {
                toast.success(res.message)
                reset()
                setOpen(false)
            }
        } catch (error) {
            toast.error(getErrorMessage(error))
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

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <section>
                        <Input
                            placeholder="Novo título..."
                            {...register("title")}
                        />
                        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                    </section>

                    <section>
                        <Controller
                            control={control}
                            name="categoryId"
                            render={({ field }) => <SelectCategory value={field.value} onChange={field.onChange} />}
                        />
                        {errors.categoryId && <p className="text-sm text-red-500">{errors.categoryId.message}</p>}
                    </section>

                    <DialogFooter>
                        <DialogClose type="button">
                            <Button className="w-full">Cancelar</Button>
                        </DialogClose>

                        <Button type="submit">
                            Salvar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
