'use client'

import { useEffect } from "react";
import { FaCheck, MdCancel } from '@/components/icons'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export function NoteModal({
    isOpen,
    onClose,
    onSubmit,
    titleValue,
    setTitleValue,
    contentValue,
    setContentValue,
    mode
}) {
    const isCreate = mode === "create";

    useEffect(() => {
        function handleKeyDown(e) {
            switch (e.key) {
                case "Escape":
                    onClose();
                    break;
                case "Enter":
                    e.preventDefault();
                    onSubmit();
                    break;
            }
        };

        if (isOpen) window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);

    }, [isOpen, onClose, onSubmit]);

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        {isCreate ? "Criar Nota" : "Editar Nota"}
                    </DialogTitle>
                </DialogHeader>

                <Input
                    autoFocus
                    placeholder="Título:"
                    value={titleValue ?? ""}
                    onChange={(e) => setTitleValue(e.target.value)}
                />

                <Textarea
                    placeholder="Conteúdo:"
                    value={contentValue ?? ""}
                    onChange={(e) => setContentValue(e.target.value)}
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