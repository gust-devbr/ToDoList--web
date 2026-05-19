import { Response } from "@/utils/response";
import { userService } from "@/services/userServices";
import { NextRequest } from "next/server";
import { jwtUtil } from "@/utils/jwt";

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json()

        const existing = await userService.findByEmail(email)
        if (existing) return Response.error("Usuário já cadastrado", null, 409)

        const user = await userService.create(name, email, password)

        const token = jwtUtil.generate(user)

        const res = Response.success({ token, user }, "Cadastrado com sucesso", 201)

        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24,
            sameSite: "lax",
            path: "/"
        })

        return res
    } catch (error) {
        return Response.error("Erro ao cadastrar", error)
    }
}