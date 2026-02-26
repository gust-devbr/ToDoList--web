import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function StatusPieChart({
    items,
    booleanKey,
    positiveLabel,
    negativeLabel,
}) {
    const positive = items.filter(item => item[booleanKey]).length;
    const negative = items.length - positive;

    const data = [
        { name: positiveLabel, value: positive, fill: "#22c55e" },
        { name: negativeLabel, value: negative, fill: "#ef4444" },
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
    );
}