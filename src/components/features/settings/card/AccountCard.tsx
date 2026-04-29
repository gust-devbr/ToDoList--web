"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"
import { apiFetch } from "@/utils/api"
import { Pencil } from "lucide-react"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"

type currentUserProps = {
    name: string
    email: string
}

export function AccountCard() {
    const { user, logout } = useAuth()

    const [isEditing, setIsEditing] = useState<string | null>(null)
    const [form, setForm] = useState<currentUserProps>({
        name: "",
        email: ""
    })

    async function handleUpdateUser(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        const { name, email } = form

        if (!name || !email) {
            toast.error("Preencha o campo")
            return
        }

        try {
            const data = await apiFetch("/private/user", {
                method: "PUT",
                body: JSON.stringify({
                    ...(name && { name }),
                    ...(email && { email })
                })
            })

            if (data.ok) {
                toast.success(data.message)
                setTimeout(() => logout(), 1000)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const disabledSubmitBtn =
        !!isEditing &&
        form.name === user?.name &&
        form.email === user?.email

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || "",
                email: user.email || ""
            })
        }
    }, [user])

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Conta</CardTitle>
                <CardDescription>Gerencie sua conta</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-row items-center gap-5">
                <div className="w-full max-w-[50%] space-y-2 relative">
                    <Label className="text-[17px]" htmlFor="name">Nome</Label>
                    <Input
                        disabled={isEditing !== "name"}
                        id="name"
                        value={form.name}
                        onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                        className="text-[17px]! py-5"
                    />
                    <button
                        onClick={() => setIsEditing(prev => (prev === "name" ? null : "name"))}
                        type="button"
                        className="absolute right-3 top-1/2 text-gray-500"
                    >
                        <Pencil />
                    </button>
                </div>

                <div className="w-full max-w-[50%] space-y-2 relative">
                    <Label className="text-[17px]" htmlFor="email">E-mail</Label>
                    <Input
                        disabled={isEditing !== "email"}
                        id="email"
                        value={form.email}
                        onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                        className="text-[17px]! py-5"
                    />
                    <button
                        onClick={() => setIsEditing(prev => (prev === "email" ? null : "email"))}
                        type="button"
                        className="absolute right-3 top-1/2 text-gray-500"
                    >
                        <Pencil />
                    </button>
                </div>
            </CardContent>

            {isEditing && (
                <CardFooter className="flex justify-end gap-2">
                    <Button className="text-[16px]" onClick={() => setIsEditing(null)}>
                        Cancelar
                    </Button>

                    <Button
                        onClick={handleUpdateUser}
                        className="bg-blue-600 text-white text-[16px]"
                        disabled={disabledSubmitBtn}
                    >
                        Salvar alterações
                    </Button>
                </CardFooter>
            )}
        </Card>
    )
}
