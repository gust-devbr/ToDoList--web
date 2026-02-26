import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const search = url.searchParams.get("search") || "";

        const user = await getUserFromToken();

        const tasks = await prisma.note.findMany({
            where: {
                userId: user.id,
                OR: [
                    { title: { contains: search, mode: "insensitive" } },
                    { content: { contains: search, mode: "insensitive" } },
                ]
            },
            orderBy: [
                { pinned: "desc" },
                { createdAt: "desc" }
            ]
        });

        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao buscar notas" }, { status: 500 });
    }
};

export async function POST(req) {
    try {
        const user = await getUserFromToken();
        const { title, content } = await req.json();

        if (!title && !content) return NextResponse.json({ error: "Título ou conteúdo obrigatório" }, { status: 400 });

        const created = await prisma.note.create({
            data: { userId: user.id, title, content }
        });

        return NextResponse.json(created, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao criar nota" }, { status: 500 });
    }
};