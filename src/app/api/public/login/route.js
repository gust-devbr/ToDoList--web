import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    try {
        const { email, senha } = await req.json();
        if (!email || !senha) return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });

        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                password: true
            }
        });
        if (!user) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });

        const matched = await bcrypt.compare(senha, user.password);
        if (!matched) return NextResponse.json({ error: "Credenciais inválidas" }, { status: 400 });

        const token = jwt.sign(
            { id: user.id, nome: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "5h" }
        );

        const safeUser = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        const response = NextResponse.json({ user: safeUser });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
        });

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao logar usuário" }, { status: 500 });
    }
};