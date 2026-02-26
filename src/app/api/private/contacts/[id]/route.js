import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

export async function DELETE(context) {
    try {
        const { id } = await context.params;

        const user = await getUserFromToken();
        if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

        const contact = await prisma.contact.findFirst({
            where: { id, userId: user.id }
        });
        if (!contact) return NextResponse.json({ error: "Contato não encontrado" }, { status: 404 });

        const deleted = await prisma.contact.delete({
            where: { id }
        });
        return NextResponse.json(deleted, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao deletar contato" }, { status: 500 });
    }
};

export async function PUT(req, context) {
    try {
        const { id } = await context.params;

        const { name, email, tel, category } = await req.json();
        if (!name || !email || !tel || !category) return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });

        const user = await getUserFromToken();
        if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

        const contact = await prisma.contact.findFirst({
            where: { id, userId: user.id }
        });
        if (!contact) return NextResponse.json({ error: "Contato não encontrado" }, { status: 404 });

        const renamed = await prisma.contact.update({
            where: { id },
            data: {
                name,
                email,
                tel,
                category
            }
        });

        return NextResponse.json(renamed, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao editar contato" }, { status: 500 });
    }
};

export async function PATCH(context) {
    try {
        const { id } = await context.params;

        const user = await getUserFromToken();
        if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

        const contact = await prisma.contact.findFirst({
            where: { id, userId: user.id }
        });
        if (!contact) return NextResponse.json({ error: "Contato não encontrado" }, { status: 404 });

        const updated = await prisma.contact.update({
            where: { id },
            data: { favorite: !contact.favorite }
        });

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao favoritar contato" }, { status: 500 });
    }
};