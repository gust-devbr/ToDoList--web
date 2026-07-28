import { NextRequest } from "next/server";

import { AuthController } from "@/modules/auth/controller/auth-controller";

export async function POST(req: NextRequest) {
    return await new AuthController().handleRegister(req)
}