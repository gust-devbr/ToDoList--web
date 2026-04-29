"use client"

import React, { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

type FormProps = {
    name: string
    email?: string
    password: string
}

const initialState: FormProps = {
    name: "",
    email: "",
    password: ""
}

export default function AuthPage() {
    const { login, register } = useAuth()
    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false)
    const [isLogin, setIsLogin] = useState<boolean>(true)
    const [showPass, setShowPass] = useState<boolean>(false)
    const [form, setForm] = useState(initialState)

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        const { name, email, password } = form;

        if (!isLogin && !name || !email || !password) {
            toast.error("Complete os campos")
            return
        }

        try {
            setLoading(true)

            const data = isLogin
                ? await login(email, password)
                : await register(name, email, password)

            if (data.ok) {
                toast.success(data.message)
                setTimeout(() => router.replace("/screens/home"), 1000)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-5 flex justify-center items-center h-screen">
            <Card className="md:w-150 w-full">
                <CardHeader>
                    <CardTitle className="text-3xl font-semibold">{isLogin ? "Login" : "Cadastro"}</CardTitle>
                    <CardDescription>
                        Preencha os dados abaixo para {isLogin ? 'entrar na sua conta' : 'criar sua conta'}
                    </CardDescription>
                    <CardAction>
                        <Button
                            className="text-lg"
                            variant="link"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {!isLogin ? "Login" : "Cadastro"}
                        </Button>
                    </CardAction>
                </CardHeader>

                <CardContent>
                    <div className="space-y-1">

                        {!isLogin && (
                            <>
                                <Label className="text-lg" htmlFor="name">Nome</Label>
                                <Input
                                    id="name"
                                    autoFocus={!isLogin}
                                    value={form.name}
                                    onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                                    className="py-5 text-lg"
                                />
                            </>
                        )}

                        <Label className="text-lg" htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            autoFocus={isLogin}
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
                            {loading
                                ? <Spinner className="w-5! h-5!" />
                                : (isLogin ? "Entrar" : "Cadastrar")
                            }
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}