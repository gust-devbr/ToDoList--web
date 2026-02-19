import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function TaskChart({ tasks }) {
    const completed = tasks.filter(t => t.completed).length;
    const notCompleted = tasks.length - completed;

    const data = [
        { name: "Concluídas", value: completed, fill: "#22c55e" },
        { name: "Não Concluídas", value: notCompleted, fill: "#ef4444" },
    ];

    return (
        <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    />
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
};  