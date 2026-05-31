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
import { useDeleteUser } from "@/hooks/react-query/user/useDeleteUser"
import { useLogout } from "@/hooks/react-query/user/useLogout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"

export function DeleteFormModal() {
    const { logout } = useLogout()
    const { mutateAsync, isPending } = useDeleteUser()

    const [password, setPassword] = useState<string>("")

    async function handleDelete() {
        if (!password) {
            toast.error("Senha obrigatória")
            return
        }

        try {
            const data = await mutateAsync(password)

            if (data.success) {
                toast.success(data.message)
                await logout()
            } else {
                toast.error("Erro", { description: data.message })
            }
        } catch (err) {
            console.error(err)
        }
    }

    const disabledBtn = !password || isPending

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Continuar</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogTitle className="text-red-600">Excluir conta</DialogTitle>
                <DialogDescription>Insira sua senha para confirmar a exclusão</DialogDescription>

                <Input
                    disabled={isPending}
                    placeholder="Sua senha..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <DialogFooter>
                    <DialogClose>Cancelar</DialogClose>
                    <Button
                        variant="outline"
                        disabled={disabledBtn}
                        onClick={handleDelete}
                    >
                        {isPending
                            ? <Spinner className="w-5! h-5!" />
                            : " Confirmar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
