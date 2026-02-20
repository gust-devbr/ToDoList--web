import { useEffect, useState } from "react";
import api from "@/services/api";
import { useTheme } from "@/context/ThemeContext";
import { TaskChart } from "@/components";
import ContactChart from "@/components/charts/ContactChart";

export default function Dashboard() {
    const { theme } = useTheme();
    const [tasks, setTasks] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [selectChart, setSelectChart] = useState("tasks");

    async function loadData() {
        try {
            if (selectChart === "tasks") {
                const res = await api.get("/tasks");
                const data = Array.isArray(res.data) ? res.data : res.data.tasks || [];
                setTasks(data);
            } else if (selectChart === "contacts") {
                const res = await api.get("/contacts");
                const data = Array.isArray(res.data)
                    ? res.data
                    : res.data.contacts || [];
                setContacts(data);
            }
        } catch (error) {
            console.error("Erro ao carregar", error);
            if (selectChart === "tasks") {
                setTasks([]);
            } else if (selectChart === "contacts") {
                setContacts([]);
            }
        }
    };

    useEffect(() => {
        if (selectChart) loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectChart]);

    //Tasks
    const completed = tasks.filter(t => t.completed).length;
    const notCompleted = tasks.length - completed;

    //Contacts
    const favorite = contacts.filter(c => c.favorite).length;
    const notFavorite = contacts.length - favorite;

    //Select
    const handleSelect = (event) => setSelectChart(event.target.value);

    return (
        <div
            className="min-h-screen px-4 py-6"
            style={{ backgroundColor: theme.card, color: theme.text }}
        >
            <header className="flex flex-col gap-7 items-center justify-center">

                <p className="text-3xl text-center mb-5 font-bold mt-5">
                    {selectChart === "tasks"
                        ? "Dashboard de Tarefas"
                        : "Dashboard de Contatos"
                    }
                </p>

                <select
                    className="text-center w-50 text-xl border-2"
                    style={{ backgroundColor: theme.card }}
                    value={selectChart}
                    onChange={handleSelect}
                >
                    <option value="tasks">Tarefas</option>
                    <option value="contacts">Contatos</option>
                </select>
            </header>

            <div className="mt-10 max-w-4xl mx-auto space-y-8">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <Card
                        cardTheme={theme.background}
                        label="Total"
                        children={selectChart === "tasks" ? tasks.length : contacts.length}
                    />

                    <Card
                        cardTheme={theme.background}
                        textColor="text-green-500"
                        label={selectChart === "tasks" ? "Concluídas" : "Favoritos"}
                        children={selectChart === "tasks" ? completed : favorite}
                    />

                    <Card
                        cardTheme={theme.background}
                        textColor="text-red-500"
                        label={selectChart === "tasks" ? "Não Concluídas" : "Não Favoritos"}
                        children={selectChart === "tasks" ? notCompleted : notFavorite}
                    />
                </div>

                <div
                    className="p-6 rounded-xl shadow"
                    style={{ backgroundColor: theme.background, minHeight: 320 }}
                >
                    {selectChart === "contacts"
                        ? <ContactChart contacts={contacts} />
                        : <TaskChart tasks={tasks} />}
                </div>
            </div>
        </div>
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