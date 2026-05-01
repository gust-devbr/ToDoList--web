"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { apiFetch } from "@/utils/api"
import { ArchiveOptionsPortal } from "@/components/portal/ArchivedOptions";
import { useCallback, useEffect, useState } from "react";
import { Undo } from "lucide-react";

const formatDate = (date: Date) => new Date(date).toLocaleDateString("pt-BR");

type ArchivedProps = {
    id: string
    title: string
    archived: boolean
    archivedAt: Date
}

export function ArchivedsList() {
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

    return (
        <div className="border p-2 rounded-sm">
            <Table className="w-full overflow-x-auto">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-zinc-500 text-lg">Tarefa</TableHead>
                        <TableHead className="text-zinc-500 text-right text-lg">Arquivada em</TableHead>
                        <TableHead className="text-right text-zinc-500 text-lg">Ações</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {archiveds?.map(archived => (
                        <TableRow key={archived.id}>
                            <TableCell className="text-lg">{archived?.title}</TableCell>
                            <TableCell className="text-right text-lg">{formatDate(archived?.archivedAt)}</TableCell>

                            <TableCell className="flex flex-row justify-end">
                                <Button
                                    onClick={() => handleUnarchive(archived.id)}
                                    className="flex flex-row items-center gap-1 text-lg text-blue-600 hover:text-blue-700"
                                    variant="ghost"
                                >
                                    <Undo className="w-5! h-5!" />
                                    Desarquivar
                                </Button>

                                <ArchiveOptionsPortal
                                    onDelete={() => handleDeleteArchived(archived.id)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
