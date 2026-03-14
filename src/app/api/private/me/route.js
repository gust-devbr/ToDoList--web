import { NextResponse } from "next/server";
import { requireAuth } from "@/components/utils/requireAuth";

export async function GET(req) {
    const user = await requireAuth(req);
    if (!user) { return NextResponse.json({ error: "Não autorizado" }, { status: 401 }) };

    return NextResponse.json(user);
};