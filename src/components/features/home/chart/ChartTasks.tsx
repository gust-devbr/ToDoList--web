import { useMemo } from "react";
import { Legend, Pie, PieChart, Tooltip } from "recharts";

type Task = {
    id: string
    title: string
    completed: boolean
    status: "pending" | "completed"
}

type TaskChartProps = {
    tasks: Task[]
}

export function ChartTasks({ tasks }: TaskChartProps) {

    const chartData = useMemo(() => {
        const completed = tasks.filter(t => t.completed === true).length
        const pending = tasks.filter(t => t.completed === false).length

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