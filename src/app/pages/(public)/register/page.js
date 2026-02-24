'use client'

import { useEffect, useState } from "react";
import { Spinner, Input, AuthButton, apiFetch } from "@/components";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [aviso, setAviso] = useState('');
    const [senhaAlert, setSenhaAlert] = useState(null)

    const router = useRouter();

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

        if (!validateEmail(email)) {
            alert("Digite um Email válido");
            return;
        };

        try {
            setLoading(true);

            const res = await fetch("/api/public/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, senha }),
            });
            alert("Cadastro realizado!" || res?.data?.error);
            router.replace("/");

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

                <Input
                    autoFocus
                    name="auth"
                    label="Nome"
                    value={nome}
                    onChangeValue={setNome}
                />

                <Input
                    name="auth"
                    label="Email"
                    value={email}
                    onChangeValue={setEmail}
                />

                <Input
                    name="auth"
                    className={`${senhaAlert ? "border-red-500 border-2" : "border"}`}
                    label="Senha"
                    value={senha}
                    onChangeValue={setSenha}
                />
                <span className={`text-sm ${senhaAlert && "text-red-500"}`}>
                    {aviso}
                </span>

                <span className="flex flex-row justify-between mt-3 mb-3 text-md py-1 px-2 rounded-xl">
                    <span>Já tem conta?</span>

                    <Link href={"/"}>
                        <span className="text-blue-600 hover:underline">Login</span>
                    </Link>
                </span>

                <AuthButton
                    disabled={isDisabled}
                    condition={isDisabled || loading}
                    icon={loading && Spinner}
                >
                    {loading ? "Cadastrando..." : "Cadastrar"}
                </AuthButton>
            </div>

            <p className="text-center text-2xs text-red-600 mt-2">*Não utilize dados reais</p>
        </form>
    )
};