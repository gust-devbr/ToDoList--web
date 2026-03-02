'use client'

import { useState } from "react"
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner";

export function ChangePassModal({ isOpen, onClose }) {
    const { logout } = useAuth()

    const [atualSenha, setAtualSenha] = useState('')
    const [novaSenha, setNovaSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')

    async function handleChangePassword() {
        if (novaSenha !== confirmarSenha) {
            return toast.error("As senhas não coincidem")
        };

        if (novaSenha.length < 6) {
            return toast.error("Nova senha deve ser maior que 6 caracteres")
        };

        try {
            await fetch('/api/private/user', {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    atualSenha,
                    novaSenha
                })
            });

            toast.success("Sua senha foi alterada");

            setAtualSenha('')
            setNovaSenha('')
            setConfirmarSenha('')

            await logout()
        } catch (err) {
            console.error(err)
            toast.error("Não foi possível alterar sua senha");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl mb-2">Alterar senha</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label className="mb-1">Senha atual</Label>
                        <Input
                            type="password"
                            value={atualSenha}
                            onChange={(e) => setAtualSenha(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label className="mb-1">Nova senha</Label>
                        <Input
                            type="password"
                            value={novaSenha}
                            onChange={(e) => setNovaSenha(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label className="mb-1">Confirmar nova senha</Label>
                        <Input
                            type="password"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleChangePassword}>
                        Salvar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};