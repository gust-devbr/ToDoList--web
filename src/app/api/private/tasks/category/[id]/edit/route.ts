import { NextRequest } from "next/server";

import { CategoriesController } from "@/modules/categories/controller/categories-controller";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    return new CategoriesController().putHandler(req, await params)
}