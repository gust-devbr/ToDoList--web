"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { useCategories } from "@/hooks/react-query/category/useCategories"
import { useDeleteCategory } from "@/hooks/react-query/category/useDeleteCategory"
import { Trash2 } from "lucide-react"

export function CategoryList() {
    const { data: categories } = useCategories()
    const deleteCategory = useDeleteCategory()

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
                                    onClick={() => deleteCategory.mutate(cat.id)}
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