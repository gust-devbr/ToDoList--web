'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Spinner,
    Input,
    AuthButton,
    ValidateUsername,
    ValidateEmail,
    ValidatePassword
} from "@/components";

export default function RegisterPage() {
    const router = useRouter();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        nome: "",
        email: "",
        senha: ""
    });

    useEffect(() => {
        setErrors(prev => ({ ...prev, nome: ValidateUsername(nome) }));
    }, [nome]);

    useEffect(() => {
        setErrors(prev => ({ ...prev, email: ValidateEmail(email) }));
    }, [email]);

    useEffect(() => {
        setErrors(prev => ({ ...prev, senha: ValidatePassword(senha) }));
    }, [senha]);

    async function handleCadastro(e) {
        e.preventDefault();

        if (errors.nome || errors.email || errors.senha) return;
        
        try {
            setLoading(true);

            await fetch("/api/public/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, senha }),
            });
            alert("Cadastro realizado!");
            setTimeout(() => router.replace("/"), 800);
        } catch (err) {
            console.error(err);
            alert("Erro ao cadastrar");
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const isDisabled =
        !nome ||
        !email ||
        !senha ||
        errors.nome ||
        errors.email ||
        errors.senha;

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
                {errors.nome && (
                    <span className="text-sm text-red-500">
                        {errors.nome}
                    </span>
                )}
                <Input
                    name="auth"
                    label="Email"
                    value={email}
                    onChangeValue={setEmail}
                />
                {errors.email && (
                    <span className="text-sm text-red-500">
                        {errors.email}
                    </span>
                )}
                <Input
                    name="auth"
                    className={`${senhaAlert ? "border-red-500 border-2" : "border"}`}
                    label="Senha"
                    value={senha}
                    onChangeValue={setSenha}
                />
                {errors.senha && (
                    <span className="text-sm text-red-500">
                        {errors.senha}
                    </span>
                )}

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