import { Response } from "@/utils/response";
import { userService } from "@/services/userServices";
import { NextRequest } from "next/server";
import { jwtUtil } from "@/utils/jwt";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json()

        const existing = await userService.findByEmail(email)
        if (!existing) return Response.error("Credenciais inválidas", null, 401)

        const validPassword = await bcrypt.compare(password, existing.password)
        if (!validPassword) return Response.error("Credenciais inválidas", null, 401)

        const safeUser = {
            id: existing.id,
            name: existing.name,
            email: existing.email
        }

        const token = jwtUtil.generate(existing!)

        const res = Response.success({ token, user: safeUser }, "Logado com sucesso")

        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24,
            path: "/"
        })

        return res
    } catch (error) {
        return Response.error("Erro ao logar", error)
    }
}