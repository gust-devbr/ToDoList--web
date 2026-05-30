"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"
import { useAddCategory } from "@/hooks/react-query/category/useAddCategory"

export function AddCategory() {
    const [name, setName] = useState<string>("")
    const [color, setColor] = useState<string>("")

    const { mutate, error, isPending } = useAddCategory()

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        if (!name || !color) {
            toast.error("Insira o título")
            return
        }

        try {
            mutate({ name, color })

            if (error) {
                toast.error("ERROR")
            } else {
                toast.success("Categoria adicionada")
                setName("")
                setColor("")
            }
        } catch (err) {
            console.error(err)
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
                    disabled={isPending || !name || !color}
                    className="bg-blue-700 text-white p-4"
                    onClick={handleSubmit}
                >
                    {isPending ? <Spinner className="w-5! h-5!" /> : "Adicionar"}
                </Button>

            </div>
        </div>
    )
}