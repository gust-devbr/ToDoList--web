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
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

import { useDeleteUser } from "@/modules/user/hooks/useUserHooks"
import { DeleteUserSchema, deleteUserSchema } from "@/modules/user/schemas/delete-user.schema"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { getErrorMessage } from "@/utils/get-error-message"

export function DeleteAccountForm() {
    const deleteUser = useDeleteUser()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(deleteUserSchema)
    })

    async function onDelete(data: DeleteUserSchema) {
        try {
            const res = await deleteUser.mutateAsync(data.password)

            if (res.success)
                toast.success(res.message)

        } catch (err) {
            toast.error(getErrorMessage(err))
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Continuar</Button>
            </DialogTrigger>

            <DialogContent>
                <form onSubmit={handleSubmit(onDelete)}>
                    <DialogTitle className="text-red-600">Excluir conta</DialogTitle>
                    <DialogDescription>Insira sua senha para confirmar a exclusão</DialogDescription>

                    <section className="space-y-2">
                        <Input
                            disabled={isSubmitting}
                            placeholder="Sua senha..."
                            {...register("password")}
                        />
                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    </section>

                    <section className="space-y-2">
                        <Input
                            disabled={isSubmitting}
                            placeholder="Confirme sua senha"
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
                    </section>


                    <DialogFooter>
                        <DialogClose type="button">Cancelar</DialogClose>
                        <Button
                            type="submit"
                            variant="outline"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <Spinner className="w-5! h-5!" /> : " Confirmar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
