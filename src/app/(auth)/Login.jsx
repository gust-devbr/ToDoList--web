import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Spinner } from "@/components/ui/spinner";

export default function Login() {
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [aviso, setAviso] = useState('');
    const [senhaAlert, setSenhaAlert] = useState(null);

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

    async function handleLogin(e) {
        e.preventDefault();

        if (!validateEmail(email)) {
            alert("Digite um Email válido");
            return;
        };

        try {
            setLoading(true)

            const res = await api.post('/auth/login', { email, senha });

            console.log(res.data)

            await login({
                token: res.data.token,
                user: { nome: res.data.nome, email: res.data.email }
            });

            setTimeout(() => {
                navigate("/tasks");
            }, 800);

        } catch (err) {
            console.log(err);
            alert("Email ou senha inválidos");
        } finally {
            setLoading(false);
        }
    };

    const isDisabled = !email || !senha || senha.length <=6;

    return (
        <form onSubmit={handleLogin}>
            <div className="flex flex-col bg-gray-100 border-none rounded-3xl p-3.5 shadow-md shadow-gray-800 min-w-100 max-w-120">
                <h1 className="text-center text-3xl mb-5 mt-2">Login</h1>

                <input
                    autoFocus
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
                    <span>Não tem conta?</span>
                    <span className="text-blue-600 hover:underline" onClick={() => navigate("/cadastro")}>Cadastre-se</span>
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
                    {loading ? "Entrando..." : "Login"}
                </button>
            </div>
        </form>
    )
};