import { NextRequest } from "next/server";

import { CategoriesController } from "@/modules/categories/controller/categories-controller";

export async function GET(req: NextRequest) {
    return new CategoriesController().getHandler(req)
}

export async function POST(req: NextRequest) {
    return new CategoriesController().postHandler(req)
}