import { useMemo } from "react";
import { Legend, Pie, PieChart, Tooltip } from "recharts";

import { TaskResponse } from "@/modules/tasks/types";

type TaskChartProps = {
    tasks: TaskResponse[] | undefined
}

export function TaskChart({ tasks }: TaskChartProps) {

    const chartData = useMemo(() => {
        const activeTasks = tasks?.filter(t => !t.archived)

        const completed = activeTasks?.filter(t => t.completed).length
        const pending = activeTasks?.filter(t => !t.completed).length

        return [
            { name: "Concluídas", value: completed, fill: "#22c55e" },
            { name: "Pendentes", value: pending, fill: "#f59e0b" },
        ]
    }, [tasks])

    return (
        <div className="w-full flex justify-center">
            <PieChart width={400} height={320}>
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    label
                />
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    )
}