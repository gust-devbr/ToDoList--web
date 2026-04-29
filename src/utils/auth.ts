import { cookies } from "next/headers";
import { jwtUtil } from "./jwt";
import { NextRequest } from "next/server";

type TokenPayload = { id: string }

async function getUserFromToken(tokenFromHeader: string | null) {
    const cookieStore = await cookies()

    const token = tokenFromHeader || cookieStore.get("token")?.value
    if (!token) return null

    try {
        return jwtUtil.verify<TokenPayload>(token)
    } catch {
        return null
    }
}

export async function getToken(req: NextRequest): Promise<TokenPayload | null> {
    const authHeader = req.headers.get("authorization")

    const tokenHeader = authHeader?.split(" ")[1] || null

    const user = await getUserFromToken(tokenHeader)
    if (!user) return null

    return user
}