import { Response } from "@/utils/response";

export async function POST() {
    const res = Response.success(null, "Logout com sucesso")
    res.cookies.set("token", "", { maxAge: 0, path: "/" })
    return res
}