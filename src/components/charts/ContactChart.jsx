import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ContactChart({ contacts }) {
    const favorite = contacts.filter(t => t.favorite).length;
    const notFavorite = contacts.length - favorite;

    const data = [
        { name: "Favoritos", value: favorite, fill: "#22c55e" },
        { name: "Não Favoritos", value: notFavorite, fill: "#ef4444" },
    ];

    return (
        <div className="w-full h-80">
            <ResponsiveContainer width="100%" height={300}>
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