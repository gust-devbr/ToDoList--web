import { NextRequest } from "next/server";

import { UserController } from "@/modules/user/controller/user-controller";

export async function GET(req: NextRequest) {
    return await new UserController().getHandler(req)
}

export async function PUT(req: NextRequest) {
    return await new UserController().putHandler(req)
}

export async function DELETE(req: NextRequest) {
    return await new UserController().deleteHandler(req)
}