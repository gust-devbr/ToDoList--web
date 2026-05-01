"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { apiFetch } from "@/utils/api"
import React, { useState } from "react"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"
import { SelectCategory } from "./SelectCategory"

export function AddTask({ reload }: { reload: () => void }) {
    const [title, setTitle] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [categoryId, setCategoryId] = useState<string | null>("")

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        if (!title) {
            toast.error("Insira o título")
            return
        }

        try {
            setLoading(true)
            const data = await apiFetch("/private/tasks", {
                method: "POST",
                body: JSON.stringify({
                    title,
                    categoryId
                })
            })

            if (data.ok) {
                toast.success("Tarefa adicionada")

                setTitle("")
                setCategoryId(null)
                setTimeout(() => reload(), 700)
            } else {
                toast.error(data.message)
            }
        } finally {
            setLoading(false)
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
                    disabled={loading || !title}
                    className="bg-blue-700 text-white p-4"
                    onClick={handleSubmit}
                >
                    {loading ? <Spinner className="w-5! h-5!" /> : "Adicionar"}
                </Button>

            </div>
        </div>
    )
}