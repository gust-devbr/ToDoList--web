import { NextRequest } from "next/server";
import { Jwt } from "./class/Jwt";

export function getUserId(req: NextRequest) {
    const token =
        req.headers.get("authorization")?.split(" ")[1]
        || req.cookies.get("token")?.value

    if (!token) return null

    try {
        return Jwt.verify(token).id
    } catch {
        return null
    }

}
