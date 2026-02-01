import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../services/api';

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleCadastro(e) {
        e.preventDefault();

        try {
            await api.post("/auth/register", { nome, email, senha });
            navigate("/login");

        } catch (err) {
            console.log(err);
            alert("Erro ao cadastrar");

        } finally {
            setLoading(false);
        }
    };

    const isDisabled = !nome || !email || !senha;

    return (
        <form onSubmit={handleCadastro}>
            <div className="flex flex-col bg-gray-100 border-none rounded-3xl p-3.5 shadow-md shadow-gray-800 min-w-100 max-w-120">
                <h1 className="text-center text-3xl mb-5 mt-2">Cadastro</h1>

                <input
                    autoFocus
                    className="border border-solid rounded-md mt-0.5 mb-0.5 py-3 px-4 text-md"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <input
                    className="border border-solid rounded-md mt-0.5 mb-0.5 py-3 px-4 text-md"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="border border-solid rounded-md mt-0.5 mb-0.5 py-3 px-4 text-md"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

                <span className="flex flex-row justify-between mt-3 mb-3 text-md py-1 px-2 rounded-xl">
                    <span>Já tem conta?</span>
                    <span className="text-blue-600 hover:underline" onClick={() => navigate("/login")}>Login</span>
                </span>

                <button
                    disabled={isDisabled}
                    className={`text-white py-2 px-3 text-xl rounded-xl hover:shadow-md hover:shadow-gray-600
                            ${isDisabled
                            ? "bg-gray-400 cursor-not-allowed pointer-events-none"
                            : "bg-green-700 hover:bg-green-600 hover:shadow-md hover:shadow-gray-600"}
                        `}
                >
                    {loading ? "Cadastrando..." : "Cadastrar"}
                </button>
            </div>

            <p className="text-center text-2xs text-red-600 mt-2">*Não utilize dados reais</p>
        </form>
    )
};