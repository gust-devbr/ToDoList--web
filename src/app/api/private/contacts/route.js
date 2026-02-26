import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const search = url.searchParams.get("search") || "";

        const user = await getUserFromToken();
        if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

        const contacts = await prisma.contact.findMany({
            where: {
                userId: user.id,
                OR: [
                    { name: { contains: search, mode: "insensitive" } },
                    { email: { contains: search, mode: "insensitive" } },
                    { tel: { contains: search, mode: "insensitive" } },
                    { category: { contains: search, mode: "insensitive" } },
                ]
            },
            orderBy: [
                { favorite: "desc" },
                { createdAt: "desc" },
            ]
        });
        if (!contacts) return NextResponse.json({ error: "Contato não encontrado" }, { status: 404 });

        return NextResponse.json(contacts, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao buscar contatos" }, { status: 500 });
    }
};

export async function POST(req) {
    try {
        const { name, email, tel, category } = await req.json();
        if (!name || !email || !tel || !category) return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });

        const user = await getUserFromToken();
        if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

        const contact = await prisma.contact.create({
            data: {
                userId: user.id,
                name,
                email,
                tel,
                category
            }
        });

        return NextResponse.json(contact, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao criar contato" }, { status: 500 });
    }
};