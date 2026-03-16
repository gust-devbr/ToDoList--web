'use client'

import { useState } from "react"
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner";
import { api } from "../utils/api";

export function DeleteAccountModal({ isOpen, onClose }) {
    const { logout, user } = useAuth();
    const [password, setPassword] = useState('');

    async function handleDeleteAccount() {
        if (!password) return toast.error("Insira a senha");
        if (password.length < 6) return toast.error("Senha maior que 6 caracteres");

        try {
            await api('/private/user', {
                method: "DELETE",
                body: JSON.stringify({
                    userId: user.id,
                    password: password
                })
            });

            toast.success("Sua conta foi excluída");

            await logout();
        } catch (err) {
            console.error(err)
            toast.error("Não foi possível deletar sua conta");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl mb-2">Confirmar Senha</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label className="mb-1">Senha:</Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleDeleteAccount} disabled={!password}>Deletar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};