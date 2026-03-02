'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FaCheck, MdCancel } from "@/components/icons"

export function TaskModal({
    isOpen,
    onClose,
    onSubmit,
    value,
    setValue,
    mode
}) {
    const isCreate = mode === "create"

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        {isCreate ? "Criar Tarefa" : "Editar Tarefa"}
                    </DialogTitle>
                </DialogHeader>

                <Textarea
                    autoFocus
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={isCreate ? "Nova tarefa..." : "Editar tarefa..."}
                />

                <DialogFooter>
                    <Button onClick={onSubmit}>
                        <FaCheck className="mr-1 h-4 w-4" />
                        {isCreate ? "Criar" : "Salvar"}
                    </Button>

                    <Button variant="outline" onClick={onClose}>
                        <MdCancel className="mr-1 h-4 w-4" />
                        Cancelar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};