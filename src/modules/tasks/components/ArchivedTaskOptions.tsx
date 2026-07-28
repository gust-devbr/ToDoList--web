"use client"

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

import { EllipsisVertical, Trash2 } from "lucide-react"

export function ArchiveTaskOptions({ onDelete }: { onDelete: () => void }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost">
                    <EllipsisVertical className="w-5! h-5! text-zinc-500" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-30">
                <Button
                    onClick={onDelete}
                    variant="ghost"
                    className="text-red-500 hover:text-red-600"
                >
                    <Trash2 className="w-5! h-5!" />
                    Excluir
                </Button>
            </PopoverContent>
        </Popover>
    )
};