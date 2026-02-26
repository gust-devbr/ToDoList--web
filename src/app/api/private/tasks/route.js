import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const search = url.searchParams.get("search") || "";

        const user = await getUserFromToken();
        if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

        const tasks = await prisma.task.findMany({
            where: {
                userId: user.id,
                title: { contains: search, mode: "insensitive" }
            },
            orderBy: [
                { completed: "desc" },
                { createdAt: "desc" }
            ]
        });
        if (!tasks) return NextResponse.json({ error: "Tarefa não encontrada" }, { status: 404 });

        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao buscar tarefas" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { title } = await req.json();
        if (!title) return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });

        const user = await getUserFromToken();
        if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

        const created = await prisma.task.create({
            data: { userId: user.id, title }
        });
        
        return NextResponse.json(created, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao criar tarefa" }, { status: 500 });
    }
};