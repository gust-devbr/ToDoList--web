import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useTheme } from "@/context";
import { FaSave, MdCancel } from '@/components/icons';
import { Input, Button } from "@/components";
import api from "@/services/api";

export default function ChangePassModal({ isOpen, onClose }) {
    const navigate = useNavigate();
    const { theme } = useTheme();

    const [atualSenha, setAtualSenha] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const { logout } = useAuth();

    async function handleChangePassword() {
        if (novaSenha !== confirmarSenha) {
            alert("As senhas não coincidem");
            return;
        };

        if (novaSenha.length <= 6) {
            alert("Nova senha tem que ser maior que 6 caracteres");
            return;
        };

        try {
            await api.put('/auth/change-pass', { atualSenha: atualSenha, novaSenha: novaSenha });

            alert("Sua senha foi alterada");
            setAtualSenha('');
            setNovaSenha('');
            setConfirmarSenha('');

            await logout();
            navigate('/Login');
        } catch (err) {
            console.log(err)
            alert(err.response?.data?.error || "Erro ao mudar senha");
        }
    };
    if (!isOpen) return null;

    return (
        <div className='flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/30'>
            <div
                className='p-5 rounded-xl w-90 min-h-20 shadow-white shadow-sm'
                style={{ backgroundColor: theme.background }}
            >
                <h2 className="text-center mb-5 text-2xl font-bold">
                    Alterar senha
                </h2>

                <Input
                    autoFocus
                    className='border rounded-sm py-2 px-2 mb-2'
                    label="Senha atual:"
                    onChangeValue={setAtualSenha}
                />

                <Input
                    className='border rounded-sm py-2 px-2 mb-2'
                    label="Nova senha:"
                    onChangeValue={setNovaSenha}
                />

                <Input
                    className='border rounded-sm w-60 py-2 px-2 mb-2'
                    label="Confirmar nova senha:"
                    onChangeValue={setConfirmarSenha}
                />

                <div className="flex justify-end -mt-8 gap-3">
                    <Button
                        style={{ color: theme.text }}
                        title="Salvar"
                        onClick={handleChangePassword}
                        icon={FaSave}
                    />

                    <Button
                        style={{ color: theme.text }}
                        title="Cancelar"
                        onClick={onClose}
                        icon={MdCancel}
                    />
                </div>
            </div>
        </div>
    )
};