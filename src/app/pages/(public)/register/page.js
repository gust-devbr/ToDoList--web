'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Spinner,
    ValidateUsername,
    ValidateEmail,
    ValidatePassword
} from "@/components";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
            <div className="flex min-h-screen items-center justify-center flex-col gap-1">
                <Card className="bg-gray-100 rounded-3xl p-3.5 shadow-md shadow-gray-800 w-100">
                    <CardTitle className="text-center text-3xl mb-5 mt-2">Cadastro</CardTitle>

                    <CardContent className="flex flex-col items-center gap-4">
                        <Input
                            autoFocus
                            placeholder="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="py-6 text-xl md:text-lg w-90"
                        />
                        {errors.nome && (
                            <span className="text-sm text-red-500">
                                {errors.nome}
                            </span>
                        )}
                        <Input
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="py-6 text-xl md:text-lg w-90"
                        />
                        {errors.email && (
                            <span className="text-sm text-red-500">
                                {errors.email}
                            </span>
                        )}
                        <Input
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="py-6 text-xl md:text-lg w-90"
                        />
                        {errors.senha && (
                            <span className="text-sm text-red-500">
                                {errors.senha}
                            </span>
                        )}
                    </CardContent>

                    <span className="flex flex-row justify-between text-md py-1 px-2 rounded-xl">
                        <span>Já tem conta?</span>

                        <Link href={"/"}>
                            <p className="text-blue-600 hover:underline text-md">Login</p>
                        </Link>
                    </span>

                    <Button disabled={isDisabled}>
                        {loading ? <Spinner /> : "Cadastrar"}
                    </Button>
                </Card>

                <p className="text-center text-2xs text-red-600 mt-2">*Não utilize dados reais</p>
            </div>
        </form>
    )
};