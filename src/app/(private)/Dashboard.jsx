import { useEffect, useState } from "react";
import api from "@/services/api";
import { useTheme } from "@/context/ThemeContext";
import { TaskChart } from "@/components/TaskChart";

export default function Dashboard() {
    const { theme } = useTheme();
    const [tasks, setTasks] = useState([]);

    async function loadTasks() {
        try {
            const res = await api.get("/tasks");
            setTasks(Array.isArray(res.data) ? res.data : res.data.tasks || []);
        } catch (error) {
            console.error("Erro ao carregar tarefas", error);
            setTasks([]);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadTasks();
    }, []);

    const completed = tasks.filter(t => t.completed).length;
    const notCompleted = tasks.length - completed;

    return (
        <div
            className="min-h-screen px-4 py-6"
            style={{ backgroundColor: theme.card, color: theme.text }}
        >
            <p className="text-3xl text-center mb-10 font-bold mt-5">
                Dashboard de Terafas
            </p>

            <hr className="border-2" />

            <div className="mt-10 max-w-4xl mx-auto space-y-8">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <Card
                        cardTheme={theme.background}
                        label="Total"
                        children={tasks.length}
                    />

                    <Card
                        cardTheme={theme.background}
                        textColor="text-green-500"
                        label="Concluídas"
                        children={completed}
                    />

                    <Card
                        cardTheme={theme.background}
                        textColor="text-red-500"
                        label="Não Concluídas"
                        children={notCompleted}
                    />
                </div>

                <div
                    className="p-6 rounded-xl shadow"
                    style={{ backgroundColor: theme.background }}
                >
                    <TaskChart tasks={tasks} />
                </div>

            </div>
        </div >
    )
};

function Card({ cardTheme, label, children, textColor }) {
    return (
        <div
            className="p-6 rounded-lg shadow text-center"
            style={{ backgroundColor: cardTheme }}
        >
            <p className="text-sm opacity-70">{label}</p>
            <p className={`text-3xl font-bold ${textColor}`}>
                {children}
            </p>
        </div>
    )
};