import { useMemo } from "react";
import { Legend, Pie, PieChart, Tooltip } from "recharts";

type Task = {
    id: string
    title: string
    completed: boolean
    status: "pending" | "completed" | "archive"
}

type TaskChartProps = {
    tasks: Task[]
}

export function ChartTasks({ tasks }: TaskChartProps) {

    const chartData = useMemo(() => {
        const activeTasks = tasks.filter(t => t.status !== "archive")

        const completed = activeTasks.filter(t => t.status === "completed").length
        const pending = activeTasks.filter(t => t.status === "pending").length

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
                >
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    )
}