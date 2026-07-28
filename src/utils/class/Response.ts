import { NextResponse } from "next/server"

export class Response {

    static success(
        data: unknown | null = null,
        message: string = "Sucesso",
        status: number = 200
    ) {
        return NextResponse.json({ success: true, message, data }, { status })
    }

    static error(
        message = "Erro interno",
        status = 500,
        details?: Record<string, unknown>
    ) {
        return NextResponse.json({
            success: false,
            message,
            ...(details && { details })
        }, { status });
    }
}
