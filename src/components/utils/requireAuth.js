import { NextResponse } from "next/server";
import { getUserFromToken } from "./auth";

export async function requireAuth(req) {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const user = await getUserFromToken(token);
    if (!user) throw NextResponse.json({ error: "Não autorizado" }, { status: 403 });
    return user;
}
