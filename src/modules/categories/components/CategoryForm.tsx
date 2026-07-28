"use client"

import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

import { useCreateCategory } from "@/modules/categories/hooks/useCreateCategory"

import { CreateCategorySchema, createCategorySchema } from "@/modules/categories/schemas/create-category.schema"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { getErrorMessage } from "@/utils/get-error-message"

export function CategoryForm() {
    const onCreate = useCreateCategory()

    const {
        reset,
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(createCategorySchema)
    })

    async function onSubmit(data: CreateCategorySchema) {
        try {
            const res = await onCreate.mutateAsync(data)

            if (res.success) {
                toast.success(res.message)
                reset()
            }
        } catch (err) {
            toast.error(getErrorMessage(err))
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flexl-col items-center gap-2">

                <section className="spcace-y-2">
                    <Input
                        placeholder="Nova categoria"
                        {...register("name")}
                        className="md:text-lg"
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </section>

                <section className="space-y-2">
                    <Controller
                        control={control}
                        name="color"
                        render={({ field }) => (
                            <Input
                                type="color"
                                value={field.value}
                                onChange={field.onChange}
                                className="md:text-lg max-w-10"
                            />
                        )}
                    />
                    {errors.color && <p className="text-sm text-red-500">{errors.color.message}</p>}
                </section>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-700 text-white p-4"
                >
                    {isSubmitting ? <Spinner className="w-5! h-5!" /> : "Adicionar"}
                </Button>
            </form>
        </div>
    )
}
