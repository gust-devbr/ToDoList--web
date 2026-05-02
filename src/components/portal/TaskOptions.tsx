"use client"

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Archive, ChevronDown, Trash, Trash2 } from "lucide-react"
import { Task } from "@/types/task"
import { UpdateTitleModal } from "../features/home/modal/UpdateTask"

type TaskPortalProps = {
    task: Task,
    onDelete: () => void
    onArchive: () => void
}

export function TaskOptionsPortal({ task, onDelete, onArchive }: TaskPortalProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost">
                    <ChevronDown className="w-5! h-5! text-zinc-500" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-25">
                <UpdateTitleModal task={task} />

                <Button variant="ghost" onClick={onDelete} className="text-red-500 hover:text-red-600">
                    <Trash2 className="w-5! h-5!" />
                    Excluir
                </Button>

                <Button variant="ghost" onClick={onArchive}>
                    <Archive className="w-5! h-5!" />
                    Arquivar
                </Button>
            </PopoverContent>
        </Popover>
    )
};