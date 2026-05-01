"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Category } from "@/types/task"
import { apiFetch } from "@/utils/api"
import { Trash2 } from "lucide-react"

type Props = {
    categories: Category[] | null
    onReload: () => void
}

export function CategoryList({ categories, onReload }: Props) {

    async function handleDelete(id: string) {
        await apiFetch(`/private/tasks/category/${id}/delete`, { method: "DELETE" })
        await onReload()
    }

    return (
        <ScrollArea className="h-25">
            <Table className="border-b border-t">
                <TableBody>
                    {categories?.map(cat => (
                        <TableRow key={cat.id} className="flex flex-row justify-between items-center">
                            <TableCell className="flex flex-row gap-2 items-center">
                                <span className="rounded-full h-4 w-4" style={{ backgroundColor: cat.color }} />
                                {cat.name}
                            </TableCell>

                            <TableCell>
                                <Button
                                    onClick={() => handleDelete(cat.id)}
                                    variant="ghost"
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <Trash2 className="w-4! h-4!" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollArea>
    )
}