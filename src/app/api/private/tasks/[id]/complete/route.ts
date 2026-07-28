import { NextRequest } from "next/server"

import { TaskController } from "@/modules/tasks/controller/task-controller"

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    return await new TaskController().patchCompleteHandler(req, await params)
}