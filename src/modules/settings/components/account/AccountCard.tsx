"use client"

import { useEffect } from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

import { UpdateUserSchema, updateUserSchema } from "@/modules/user/schemas/update-user.schema"
import { useUpdateUser, useUser } from "@/modules/user/hooks/useUserHooks"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { getErrorMessage } from "@/utils/get-error-message"

export function AccountCard() {
    const { data: user } = useUser()
    const onUpdate = useUpdateUser()

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting }
    } = useForm({
        resolver: zodResolver(updateUserSchema)
    })

    async function onSubmit(data: UpdateUserSchema) {
        try {
            const res = await onUpdate.mutateAsync(data)

            if (res.success)
                toast.success(res.message)

        } catch (err) {
            toast.error(getErrorMessage(err))
        }
    }

    useEffect(() => {
        if (user) {
            reset({
                name: user?.name,
                email: user?.email
            })
        }
    }, [user, reset])

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle className="text-2xl">Conta</CardTitle>
                <CardDescription>Gerencie sua conta</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-row items-center gap-5">
                <div className="w-full max-w-[50%] space-y-2 relative">
                    <Label className="text-[17px]" htmlFor="name">Nome</Label>
                    <Input
                        id="name"
                        {...register("name")}
                        className="text-[17px]! py-5"
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>

                <div className="w-full max-w-[50%] space-y-2 relative">
                    <Label className="text-[17px]" htmlFor="email">E-mail</Label>
                    <Input
                        id="email"
                        {...register("email")}
                        className="text-[17px]! py-5"
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>
            </CardContent>

            <CardFooter hidden={!isDirty} className="flex justify-end gap-2">
                <Button className="text-[16px]" onClick={() => reset()}>
                    Cancelar
                </Button>

                <Button
                    onClick={handleSubmit(onSubmit)}
                    className="bg-blue-600 text-white text-[16px]"
                >
                    {isSubmitting
                        ? <Spinner className="w-5! h-5!" />
                        : "Salvar alterações"}
                </Button>
            </CardFooter>
        </Card>
    )
}
