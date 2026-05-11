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
import { ArchiveOptionsPortal } from "@/components/portal/ArchivedOptions";
import { Undo } from "lucide-react";
import { useArchiveds } from "@/hooks/useArchiveds";

const formatDate = (date: Date) => new Date(date).toLocaleDateString("pt-BR");

export function ArchivedsList() {
    const { archiveds, handleDeleteArchived, handleUnarchive } = useArchiveds()

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
                    {archiveds?.map(archived => {
                        const { id, title, archivedAt } = archived

                        return (
                            <TableRow key={id}>
                                <TableCell className="text-lg">{title}</TableCell>
                                <TableCell className="text-right text-lg">
                                    {archivedAt && formatDate(archivedAt)}
                                </TableCell>

                                <TableCell className="flex flex-row justify-end">
                                    <Button
                                        onClick={() => handleUnarchive(id)}
                                        className="flex flex-row items-center gap-1 text-lg text-blue-600 hover:text-blue-700"
                                        variant="ghost"
                                    >
                                        <Undo className="w-5! h-5!" />
                                        Desarquivar
                                    </Button>

                                    <ArchiveOptionsPortal
                                        onDelete={() => handleDeleteArchived(id)}
                                    />
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}
