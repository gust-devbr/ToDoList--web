"use client"

import { Task } from "@/types/task"
import { apiFetch } from "@/utils/api"
import { useCallback, useEffect, useState } from "react"

type ArchivedProps = Omit<Task, 'completed' | 'status' | 'category'>

export function useArchiveds() {
    const [archiveds, setArchiveds] = useState<ArchivedProps[]>([])

    const loadArchiveds = useCallback(async () => {
        const res = await apiFetch("/private/tasks?status=archived")

        if (res.ok) {
            const data = res?.tasks || res?.data?.tasks || []
            setArchiveds(data)
        } else {
            setArchiveds([])
        }
    }, [])

    async function handleDeleteArchived(id: string) {
        await apiFetch(`/private/tasks/${id}/delete`, { method: "DELETE" })
        await loadArchiveds()
    }

    async function handleUnarchive(id: string) {
        await apiFetch(`/private/tasks/${id}/archive`, { method: "PATCH" })
        await loadArchiveds()
    }

    useEffect(() => {
        loadArchiveds()
    }, [loadArchiveds])

    return {
        archiveds,
        handleDeleteArchived,
        handleUnarchive
    }
}
