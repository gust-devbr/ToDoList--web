import { NextRequest } from "next/server"

import { TaskController } from "@/modules/tasks/controller/task-controller"

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    return await new TaskController().putHandler(req, await params)
}