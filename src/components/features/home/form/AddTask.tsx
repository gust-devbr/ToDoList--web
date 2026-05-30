"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"
import { SelectCategory } from "./SelectCategory"
import { useCreateTask } from "@/hooks/react-query/task/useCreateTask"

export function AddTask() {
    const [title, setTitle] = useState<string>("")
    const [categoryId, setCategoryId] = useState<string | null>("")

    const createTask = useCreateTask()

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        if (!title) {
            toast.error("Insira o título")
            return
        }

        try {
            createTask.mutate({
                title,
                categoryId: categoryId ?? ""
            })

            if (createTask.error) {
                toast.error("ERROR")
            } else {
                toast.success("Tarefa adicionada")

                setTitle("")
                setCategoryId(null)
            }
        } catch (err) {
            console.error(err)
        }

    }

    return (
        <div className="flex flex-col gap-2 p-4 border rounded-sm">
            <h1 className="text-xl">Adicionar tarefa</h1>

            <div className="flex flexl-col justify-between items-center gap-2">
                <Input
                    placeholder="Título da tarefa..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="md:text-lg"
                />

                <SelectCategory value={categoryId} onChange={setCategoryId} />

                <Button
                    disabled={!title}
                    className="bg-blue-700 text-white p-4"
                    onClick={handleSubmit}
                >
                    {createTask.isPending ? <Spinner className="w-5! h-5!" /> : "Adicionar"}
                </Button>

            </div>
        </div>
    )
}