import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../services/api';
import { Spinner } from "@/components/ui/spinner";

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [aviso, setAviso] = useState('');
    const [senhaAlert, setSenhaAlert] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        if (senha.length === 0) {
            setAviso('')
            setSenhaAlert(false)
        } else if (senha.length <= 6) {
            setAviso('Senha maior que 6 caracteres')
            setSenhaAlert(true)
        } else {
            setAviso('')
            setSenhaAlert(false)
        }
    }, [senha])

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    async function handleCadastro(e) {
        e.preventDefault();

        if(!validateEmail(email)) {
            alert("Digite um Email válido");
            return;
        };

        try {
            setLoading(true);

            await api.post("/auth/register", { nome, email, senha });
            navigate("/login");

        } catch (err) {
            console.log(err);
            alert("Erro ao cadastrar");
            setLoading(false);

        } finally {
            setLoading(false);
        }
    };

    const isDisabled = !nome || !email || !senha || senha.length <= 6;

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
                    className={`border border-solid rounded-md mt-0.5 mb-0.5 py-3 px-4 text-md ${senhaAlert ? "border-red-500 border-2" : "border"}`}
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <span className={`text-sm ${senhaAlert && "text-red-500"}`}>
                    {aviso}
                </span>

                <span className="flex flex-row justify-between mt-3 mb-3 text-md py-1 px-2 rounded-xl">
                    <span>Já tem conta?</span>
                    <span className="text-blue-600 hover:underline" onClick={() => navigate("/login")}>Login</span>
                </span>

                <button
                    disabled={isDisabled}
                    className={`text-white py-2 px-3 text-xl rounded-xl hover:shadow-md hover:shadow-gray-600
                            ${isDisabled || loading
                            ? "bg-gray-400 cursor-not-allowed pointer-events-none"
                            : "bg-green-700 hover:bg-green-600 hover:shadow-md hover:shadow-gray-600"}
                        `}
                >
                    {loading && <Spinner className="ml-23 -mb-6 mt-2 size-6" />}
                    {loading ? "Cadastrando..." : "Cadastrar"}
                </button>
            </div>

            <p className="text-center text-2xs text-red-600 mt-2">*Não utilize dados reais</p>
        </form>
    )
};