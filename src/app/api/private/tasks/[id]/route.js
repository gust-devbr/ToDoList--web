import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

export async function DELETE(req, context) {
    try {
        const user = await getUserFromToken();
        const { id } = await context.params;

        const task = await prisma.task.findFirst({
            where: { id, userId: user.id }
        });
        if (!task) return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

        const deleted = await prisma.task.delete({
            where: { id }
        });

        if (deleted.count === 0) return NextResponse.json({ message: "Tarefa não encontrada" }, { status: 404 });

        return NextResponse.json(deleted, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao deletar tarefa" }, { status: 500 });
    }
};

export async function PUT(req, context) {
    try {
        const { title } = await req.json();
        const user = await getUserFromToken();
        const { id } = await context.params;

        const task = await prisma.task.findFirst({
            where: { id, userId: user.id }
        });
        if (!task) return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

        if (!title) return NextResponse.json({ error: "Título obrigatório" }, { status: 400 });

        const renamed = await prisma.task.update({
            where: { id },
            data: { ...(title && { title }) }
        });

        if (renamed.count === 0) return NextResponse.json({ message: "Tarefa não encontrada" }, { status: 404 });

        return NextResponse.json(renamed, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao renomear tarefa" }, { status: 500 });
    }
};

export async function PATCH(req, context) {
    try {
        const user = await getUserFromToken();
        const { id } = await context.params;

        const task = await prisma.task.findFirst({
            where: { id, userId: user.id }
        });
        if (!task) return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

        const updated = await prisma.task.update({
            where: { id },
            data: { completed: !task.completed }
        });

        if (updated.count === 0) return NextResponse.json({ message: "Tarefa não encontrada" }, { status: 404 });

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao atualizar tarefa" }, { status: 500 });
    }
};