import { NextRequest } from "next/server";

import { TaskController } from "@/modules/tasks/controller/task-controller";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    return await new TaskController().deleteHandler(req, await params)
}