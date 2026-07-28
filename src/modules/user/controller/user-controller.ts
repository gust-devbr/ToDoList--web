import { NextRequest } from "next/server";

import { UserService } from "../service/user-service";

import { getUserId } from "@/utils/auth";
import { Response } from "@/utils/class/Response";

export class UserController {

    constructor(
        private service = new UserService()
    ) { }

    getHandler = async (req: NextRequest) => {
        try {
            const userId = getUserId(req)
            if (!userId)
                return Response.error("Não autorizado", 401)

            const user = await this.service.getUser(userId)

            return Response.success({ user })
        } catch (error) {
            return Response.error((error as Error).message ?? "Erro interno")
        }
    }

    putHandler = async (req: NextRequest) => {
        try {
            const userId = getUserId(req)
            if (!userId)
                return Response.error("Não autorizado", 401)

            const user = await this.service.update(
                userId,
                await req.json()
            )

            return Response.success({ user }, "Usuário editado")
        } catch (error) {
            return Response.error((error as Error).message ?? "Erro interno")
        }
    }

    deleteHandler = async (req: NextRequest) => {
        try {
            const userId = getUserId(req)
            if (!userId)
                return Response.error("Não autorizado", 401)

            await this.service.delete(
                userId,
                (await req.json()).password
            )

            const res = Response.success(null, "Usuário excluído")
            res.cookies.set("token", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 0,
                path: "/"
            })
            return res
        } catch (error) {
            return Response.error((error as Error).message ?? "Erro interno")
        }
    }

}
