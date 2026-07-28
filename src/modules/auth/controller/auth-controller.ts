import { NextRequest } from "next/server";

import { AuthService } from "../service/auth-service";
import { Response } from "@/utils/class/Response";

export class AuthController {

    constructor(
        private service = new AuthService()
    ) { }

    handleRegister = async (req: NextRequest) => {
        try {
            const body = await req.json()

            const { token, user } = await this.service.register(body)

            const res = Response.success({ token, user }, "Cadastro realizado", 201)
            res.cookies.set("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7,
                sameSite: "lax",
                path: "/"
            })

            return res
        } catch (error) {
            return Response.error((error as Error).message ?? "Erro interno")
        }
    }

    handleLogin = async (req: NextRequest) => {
        try {
            const body = await req.json()

            const { token, user } = await this.service.login(body)

            const res = Response.success({ token, user }, "Login realizado")
            res.cookies.set("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7,
                sameSite: "lax",
                path: "/"
            })

            return res
        } catch (error) {
            return Response.error((error as Error).message ?? "Erro interno")
        }
    }

    handleLogout = async () => {
        const res = Response.success(null, "Logout realizado")
        res.cookies.delete("token")
        return res
    }

}
