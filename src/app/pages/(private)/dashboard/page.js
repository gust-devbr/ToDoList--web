/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-children-prop */
'use client'

import { useCallback, useEffect, useState } from "react";
import { useTheme } from "@/context";
import { StatusPieChart, ChartConfig } from "@/components";

export default function Dashboard() {
    const { theme } = useTheme();
    const [tasks, setTasks] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [notes, setNotes] = useState([]);
    const [selectChart, setSelectChart] = useState("tasks");

    const loadData = useCallback(async () => {
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
                case "notes":
                    res = await fetch("/api/private/notes", {
                        method: "GET",
                        headers: { "Content-Type": "application/json" }
                    });
                    data = await res.json();
                    setNotes(Array.isArray(data) ? data : data.notes || []);
                    break;
            }
        } catch (error) {
            console.error("Erro ao carregar dados", error);
            switch (selectChart) {
                case "tasks": setTasks([]); break;
                case "contacts": setContacts([]); break;
                case "notes": setNotes([]); break;
            }
        }
    }, [selectChart]);

    useEffect(() => {
        if (selectChart) loadData();
    }, [loadData]);

    //Tasks
    const completed = tasks.filter(t => t.completed).length;
    const notCompleted = tasks.length - completed;

    //Contacts
    const favorite = contacts.filter(c => c.favorite).length;
    const notFavorite = contacts.length - favorite;

    //Notes
    const pinned = notes.filter(n => n.pinned).length;
    const notPinned = notes.length - pinned;

    //Select
    const handleSelect = (event) => setSelectChart(event.target.value);

    const config = ChartConfig[selectChart];

    const isTask = selectChart === 'tasks';
    const isNote = selectChart === 'notes';

    return (
        <div
            className="min-h-screen px-4 py-6"
            style={{ backgroundColor: theme.card, color: theme.text }}
        >
            <header className="flex flex-col gap-7 items-center justify-center">

                <p className="text-3xl text-center mb-5 font-bold mt-5">
                    Dashboard de {isTask ? "Tarefas" : (isNote ? "Notas" : "Contatos")}
                </p>

                <select
                    className="text-center w-50 text-xl border-2"
                    style={{ backgroundColor: theme.card }}
                    value={selectChart}
                    onChange={handleSelect}
                >
                    <option value="tasks">Tarefas</option>
                    <option value="contacts">Contatos</option>
                    <option value="notes">Notas</option>
                </select>
            </header>

            <div className="mt-10 max-w-4xl mx-auto space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card
                        cardTheme={theme.background}
                        label="Total"
                        children={isTask ? tasks.length : (isNote ? notes.length : contacts.length)}
                    />
                    <Card
                        cardTheme={theme.background}
                        textColor="text-green-500"
                        label={isTask ? "Concluídas" : (isNote ? "Fixadas" : "Favoritos")}
                        children={isTask ? completed : (isNote ? pinned : favorite)}
                    />
                    <Card
                        cardTheme={theme.background}
                        textColor="text-red-500"
                        label={isTask ? "Não Concluídas" : (isNote ? "Não Fixadas" : "Não Favoritos")}
                        children={isTask ? notCompleted : (isNote ? notPinned : notFavorite)}
                    />
                </div>

                <div className="p-6 rounded-xl shadow" style={{ backgroundColor: theme.background, minHeight: 320 }}>
                    <StatusPieChart
                        items={isTask ? tasks : (isNote ? notes : contacts)}
                        booleanKey={config.booleanKey}
                        positiveLabel={config.positiveLabel}
                        negativeLabel={config.negativeLabel}
                    />
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