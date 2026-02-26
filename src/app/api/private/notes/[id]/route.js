import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

export async function DELETE(req, context) {
    try {
        const user = await getUserFromToken();
        const { id } = await context.params;

        const note = await prisma.note.findFirst({
            where: { id, userId: user.id }
        });
        if (!note) return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

        const deleted = await prisma.note.delete({
            where: { id }
        });

        if (deleted.count === 0) return NextResponse.json({ message: "Nota não encontrada" }, { status: 404 });

        return NextResponse.json(deleted, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao deletar nota" }, { status: 500 });
    }
};

export async function PUT(req, context) {
    try {
        const { title, content } = await req.json();
        const user = await getUserFromToken();
        const { id } = await context.params;

        const note = await prisma.note.findFirst({
            where: { id, userId: user.id }
        });
        if (!note) return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

        if (!title && !content) return NextResponse.json({ error: "Título ou conteúdo obrigatório" }, { status: 400 });

        const renamed = await prisma.note.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(content && { content })
            }
        });

        if (renamed.count === 0) return NextResponse.json({ message: "Nota não encontrada" }, { status: 404 });

        return NextResponse.json(renamed, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao editar nota" }, { status: 500 });
    }
};

export async function PATCH(req, context) {
    try {
        const user = await getUserFromToken();
        const { id } = await context.params;

        const note = await prisma.note.findFirst({
            where: { id, userId: user.id }
        });
        if (!note) return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

        const updated = await prisma.note.update({
            where: { id },
            data: { pinned: !note.pinned }
        });

        if (updated.count === 0) return NextResponse.json({ message: "Nota não encontrada" }, { status: 404 });

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao fixar nota" }, { status: 500 });
    }
};