import { NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth";

export async function GET() {
    const user = await getUserFromToken();
    if (!user) { return NextResponse.json({ error: "Não autorizado" }, { status: 401 }) };

    return NextResponse.json(user);
};