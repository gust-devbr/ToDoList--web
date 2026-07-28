"use client"

import { Spinner } from "@/components/ui/spinner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import { SelectCategory } from "@/modules/categories/components/SelectCategory"

import { useCreateTask } from "@/modules/tasks/hooks/useTaskHooks"
import { CreateTaskSchema, createTaskSchema } from "@/modules/tasks/schemas/create-task.schema"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { getErrorMessage } from "@/utils/get-error-message"

export function CreateTaskForm() {
    const createTask = useCreateTask()

    const {
        reset,
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(createTaskSchema),
        defaultValues: { title: "", categoryId: "" }
    })

    async function onSubmit(data: CreateTaskSchema) {
        try {
            const res = await createTask.mutateAsync(data)

            if (res.success) {
                toast.success(res.message)
                reset()
            }
        } catch (err) {
            toast.error(getErrorMessage(err))
        }

    }

    return (
        <div className="flex flex-col gap-2 p-4 border rounded-sm">
            <h1 className="text-xl">Adicionar tarefa</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row justify-between items-center gap-2">
                <section className="w-full">
                    <Input
                        placeholder="Título da tarefa..."
                        {...register("title")}
                        className="md:text-lg"
                    />
                    {errors.title && <span className="text-sm text-red-500">{errors.title.message}</span>}
                </section>

                <section>
                    <Controller
                        control={control}
                        name="categoryId"
                        render={({ field }) => <SelectCategory value={field.value} onChange={field.onChange} />}
                    />
                    {errors.categoryId && <span className="text-sm text-red-500">{errors.categoryId.message}</span>}
                </section>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-700 text-white p-4"
                >
                    {isSubmitting ? <Spinner className="w-5! h-5!" /> : "Adicionar"}
                </Button>

            </form>
        </div>
    )
}