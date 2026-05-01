import { NextRequest } from "next/server";

type Status = "all" | "completed" | "pending" | "archived"

export function getSearchParams(req: NextRequest) {
    const url = new URL(req.url)

    const rawStatus = url.searchParams.get("status")
    const archivedParam: string | null = url.searchParams.get("archived")

    const status: Status =
        rawStatus === "completed" ||
            rawStatus === "pending" ||
            rawStatus === "archived"
            ? rawStatus
            : "all"

    return { status, archivedParam }
}