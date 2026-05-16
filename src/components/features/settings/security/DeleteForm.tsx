"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/AuthContext"
import { apiFetch } from "@/utils/api"
import { useState } from "react"
import { toast } from "sonner"

export function DeleteFormModal() {
    const { logout } = useAuth()

    const [password, setPassword] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    async function handleDelete() {
        setLoading(true)

        if (!password) {
            toast.error("Insira sua senha")
            return
        }

        try {
            const data = await apiFetch("/private/user/delete-account", {
                method: "DELETE",
                body: JSON.stringify({ password })
            })

            if (data.ok) {
                toast.success(data?.message)
                await logout()
            } else {
                toast.error(data?.message)
            }
        } finally {
            setLoading(false)
        }
    }

    const disabledBtn = !password || loading

    return (
        <Dialog>
            <DialogTrigger asChild>
                <p>Continuar</p>
            </DialogTrigger>

            <DialogContent>
                <DialogTitle className="text-red-600">Excluir conta</DialogTitle>
                <DialogDescription>Insira sua senha para confirmar a exclusão</DialogDescription>

                <div>
                    <Input
                        disabled={loading}
                        placeholder="Sua senha..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <DialogFooter>
                    <DialogClose>Cancelar</DialogClose>
                    <button
                        disabled={disabledBtn}
                        className={disabledBtn ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
                        onClick={handleDelete}
                    >
                        Confirmar
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
