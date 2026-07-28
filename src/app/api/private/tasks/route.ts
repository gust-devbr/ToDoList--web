import { NextRequest } from "next/server";

import { TaskController } from "@/modules/tasks/controller/task-controller";

export async function GET(req: NextRequest) {
    return await new TaskController().getHandler(req)
}

export async function POST(req: NextRequest) {
    return await new TaskController().postHandler(req)
}