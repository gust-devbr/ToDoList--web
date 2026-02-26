/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-children-prop */
'use client'

import { useEffect, useState } from "react";
import { useTheme } from "@/context";
import { TaskChart, ContactChart } from "@/components";

export default function Dashboard() {
    const { theme } = useTheme();
    const [tasks, setTasks] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [selectChart, setSelectChart] = useState("tasks");

    async function loadData() {
        let data;
        let res;

        try {
            switch (selectChart) {
                case "tasks":
                    res = await fetch("/api/private/tasks", {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    });
                    data = await res.json();
                    setTasks(Array.isArray(data) ? data : data.tasks || []);
                    break;
                case "contacts":
                    res = await fetch("/api/private/contacts", {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    });
                    data = await res.json();
                    setContacts(Array.isArray(data) ? data : data.contacts || []);
                    break;
            }
        } catch (error) {
            console.error("Erro ao carregar dados", error);
            switch (selectChart) {
                case "tasks": setTasks([]); break;
                case "contacts": setContacts([]); break;
            }
        }
    };

    useEffect(() => {
        if (selectChart) loadData();
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