import { NextResponse } from "next/server";

export const Response = {
    success: (
        data: unknown = null,
        message: string = "Sucesso",
        status: number = 200
    ) => {
        return NextResponse.json({ success: true, message, data }, { status });
    },

    error: (
        message: string = "Erro interno",
        details: unknown = null,
        status: number = 500
    ) => {
        console.error("Error: ", details);
        return NextResponse.json({ success: false, message, details }, { status });
    }
};