import { NextRequest } from "next/server";

import { CategoriesController } from "@/modules/categories/controller/categories-controller";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    return new CategoriesController().deleteHandler(req, await params)
}