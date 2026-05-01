import { apiFetch } from "@/utils/api"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Category } from "@/types/task"

export function useCategories() {
    const [categories, setCategories] = useState<Category[] | null>([])
    const [loading, setLoading] = useState<boolean>(false)

    async function fetchCategories() {
        try {
            setLoading(true)
            const res = await apiFetch("/private/tasks/category")

            if (res.ok) {
                const data = res?.categories || res?.data?.categories || []
                setCategories(data)
            } else {
                toast.error(res.message)
                setCategories([])
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return {
        categories,
        loading,
        refetch: fetchCategories
    }
}