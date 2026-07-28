import { ChartNoAxesColumnIncreasing } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { Task } from "@prisma/client";

type StatisticsCardsProps = {
    tasks: Task[] | undefined
}

const badgeStyle = {
    total: "bg-blue-100 text-blue-600 text-md p-3",
    completed: "bg-green-100 text-green-600 text-md p-3",
    pending: "bg-yellow-100 text-yellow-600 text-md p-3"
}

export function StatisticsCards({ tasks }: StatisticsCardsProps) {

    const total = tasks?.length;
    const completed = tasks?.filter(t => t.completed).length;
    const pending = tasks?.filter(t => !t.completed).length;

    return (
        <main className="flex md:flex-row flex-col md:gap-0 gap-5 justify-between items-center">
            <div className="flex flex-row items-center gap-2 text-xl">
                <ChartNoAxesColumnIncreasing className="h-6! w-6! text-blue-600" />
                Progresso de Tarefas
            </div>

            <Separator className="md:hidden" />

            <div className="flex flex-row gap-3 items-center">
                <Badge className={badgeStyle.total}>{total} Total</Badge>
                <Badge className={badgeStyle.pending}>{pending} Pendentes</Badge>
                <Badge className={badgeStyle.completed}>{completed} Concluídas</Badge>
            </div>
        </main>
    )
}