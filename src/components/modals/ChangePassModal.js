'use client'

import { useState } from "react"
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner";

export function ChangePassModal({ isOpen, onClose }) {
    const { logout } = useAuth();

    const [state, setState] = useState({
        atualSenha: "",
        novaSenha: "",
        confirmarSenha: ""
    });

    async function handleChangePassword() {
        if (state.novaSenha !== state.confirmarSenha) {
            return toast.error("As senhas não coincidem")
        };

        if (state.novaSenha.length < 6) {
            return toast.error("Nova senha deve ser maior que 6 caracteres")
        };

        try {
            await fetch('/api/private/user', {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    atualSenha: state.atualSenha,
                    novaSenha: state.novaSenha
                })
            });

            toast.success("Sua senha foi alterada");

            setState(prev => ({
                ...prev,
                atualSenha: "",
                novaSenha: "",
                confirmarSenha: ""
            }));

            await logout();
        } catch {
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
                            value={state.atualSenha}
                            onChange={(e) => setState(prev => ({ ...prev, atualSenha: e.target.value }))}
                        />
                    </div>

                    <div>
                        <Label className="mb-1">Nova senha</Label>
                        <Input
                            value={state.novaSenha}
                            onChange={(e) => setState(prev => ({ ...prev, novaSenha: e.target.value }))}
                        />
                    </div>

                    <div>
                        <Label className="mb-1">Confirmar nova senha</Label>
                        <Input
                            value={state.confirmarSenha}
                            onChange={(e) => setState(prev => ({ ...prev, confirmarSenha: e.target.value }))}
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