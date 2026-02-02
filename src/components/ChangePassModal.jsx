import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { MdCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";

export default function ChangeModalPass({ isOpen, onClose }) {
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
                className='p-5 rounded-xl w-80 min-h-20 shadow-white shadow-sm'
                style={{ backgroundColor: theme.background }}
            >
                <h2 className="text-center mb-5 text-xl">
                    Alterar senha
                </h2>

                <input
                    autoFocus
                    className='border rounded-sm px-2 mb-2'
                    placeholder="Senha atual:"
                    onChange={(e) => setAtualSenha(e.target.value)}
                />

                <input
                    className='border rounded-sm px-2 mb-2'
                    placeholder="Nova senha:"
                    onChange={(e) => setNovaSenha(e.target.value)}
                />

                <input
                    className='border rounded-sm px-2'
                    placeholder="Confirmar nova senha:"
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                />

                <div className="flex justify-end -mt-6 gap-2">
                    <button
                        className='border-none bg-transparent text-xl cursor-pointer'
                        style={{ color: theme.text }}
                        title="Salvar"
                        onClick={handleChangePassword}
                    >
                        <FaSave />
                    </button>

                    <button
                        className='border-none bg-transparent text-xl cursor-pointer'
                        style={{ color: theme.text }}
                        title="Cancelar"
                        onClick={onClose}
                    >
                        <MdCancel />
                    </button>
                </div>
            </div>
        </div>
    )
};