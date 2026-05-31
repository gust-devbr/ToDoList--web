"use client"

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRegisterUser } from "@/mutations/user/useRegisterUser"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import React, { useState } from "react"
import { toast } from "sonner"

type FormProps = {
    name: string
    email: string
    password: string
}

export default function AuthPage() {
    const register = useRegisterUser()

    const router = useRouter()

    const [showPass, setShowPass] = useState<boolean>(false)
    const [form, setForm] = useState<FormProps>({
        name: "",
        email: "",
        password: ""
    })

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        const { name, email, password } = form;

        if (!name || !email || !password) {
            toast.error("Erro", { description: "Complete os campos" })
            return
        }

        try {
            const data = await register.mutateAsync({ name, email, password })

            if (data.success) {
                toast.success("Sucesso", { description: data.message, })
                setTimeout(() => router.replace("/screens/home"), 1000)
            } else {
                toast.error("Erro", { description: data.message })
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="p-5 flex justify-center items-center h-screen">
            <Card className="md:w-150 w-full">
                <CardHeader>
                    <CardTitle className="text-3xl font-semibold">Cadastro</CardTitle>
                    <CardDescription>
                        Preencha os dados abaixo para criar sua conta
                    </CardDescription>
                    <CardAction>
                        <Button
                            className="text-lg"
                            variant="link"
                            onClick={() => router.replace("/screens/login")}
                        >
                            Login
                        </Button>
                    </CardAction>
                </CardHeader>

                <CardContent>
                    <div className="space-y-1">

                        <Label className="text-lg" htmlFor="name">Nome</Label>
                        <Input
                            id="name"
                            autoFocus
                            value={form.name}
                            onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                            className="py-5 text-lg"
                        />

                        <Label className="text-lg" htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            autoCapitalize="off"
                            value={form.email}
                            onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                            className="py-5 text-lg"
                        />

                        <Label className="text-lg" htmlFor="password">Senha</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPass ? "text" : "password"}
                                value={form.password}
                                onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
                                className="py-5 text-lg pr-10"
                            />

                            <button
                                onClick={() => setShowPass(!showPass)}
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <Button
                            onClick={handleSubmit}
                            className="w-full py-5 text-xl mt-5 bg-blue-700"
                        >
                            {register.isPending
                                ? <Spinner className="w-5! h-5!" />
                                : "Cadastrar"
                            }
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
