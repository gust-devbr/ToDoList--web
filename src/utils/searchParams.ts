import { NextRequest } from "next/server";

type Status = "all" | "completed" | "pending"

export function getSearchParams(req: NextRequest) {
    const url = new URL(req.url)

    const rawStatus = url.searchParams.get("status")

    const status: Status =
        rawStatus === "completed" || rawStatus === "pending"
            ? rawStatus
            : "all"

    return { status }
}