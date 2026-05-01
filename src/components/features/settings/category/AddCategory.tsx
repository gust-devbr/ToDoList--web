"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { apiFetch } from "@/utils/api"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"

export function AddCategory({ onReload }: { onReload: () => void }) {
    const [loading, setLoading] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [color, setColor] = useState<string>("")

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        if (!name || !color) {
            toast.error("Insira o título")
            return
        }

        try {
            setLoading(true)
            const data = await apiFetch("/private/tasks/category", {
                method: "POST",
                body: JSON.stringify({ name, color })
            })

            if (data.ok) {
                toast.success("Categoria adicionada")

                setName("")
                setColor("")
                await onReload()
            } else {
                toast.error(data.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flexl-col items-center gap-2">
                <Input
                    placeholder="Nova categoria"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="md:text-lg"
                />

                <Input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="md:text-lg max-w-10"
                />

                <Button
                    disabled={loading || !name || !color}
                    className="bg-blue-700 text-white p-4"
                    onClick={handleSubmit}
                >
                    {loading ? <Spinner className="w-5! h-5!" /> : "Adicionar"}
                </Button>

            </div>
        </div>
    )
}