"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import {
    Card,
    CardTitle,
    CardAction,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

import { Eye, EyeOff } from "lucide-react"

import { registerSchema, RegisterSchemaType } from "@/modules/auth/schemas/register-user.schema"
import { useRegister } from "@/modules/auth/hooks/useRegister"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { getErrorMessage } from "@/utils/get-error-message"

export function RegisterForm() {
    const onRegister = useRegister()
    const router = useRouter()

    const [showPass, setShowPass] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(registerSchema)
    })

    async function onSubmit(data: RegisterSchemaType) {
        try {
            const res = await onRegister.mutateAsync(data)

            if (res.success)
                toast.success(res.message)

        } catch (err) {
            toast.error(getErrorMessage(err))
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
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
                        <section className="space-y-2">
                            <Label className="text-lg" htmlFor="name">Nome</Label>
                            <Input
                                id="name"
                                autoFocus
                                autoCapitalize="off"
                                {...register("name")}
                                className="py-5 text-lg"
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                        </section>

                        <section className="space-y-2">
                            <Label className="text-lg" htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                autoFocus
                                autoCapitalize="off"
                                {...register("email")}
                                className="py-5 text-lg"
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </section>

                        <section className="space-y-2">
                            <Label className="text-lg" htmlFor="password">Senha</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPass ? "text" : "password"}
                                    {...register("password")}
                                    className="py-5 text-lg pr-10"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                        </section>

                        <Button
                            type="submit"
                            className="w-full py-5 text-xl mt-5 bg-blue-700"
                        >
                            {isSubmitting ? <Spinner className="w-5! h-5!" /> : "Cadastrar"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
