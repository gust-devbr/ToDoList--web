/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useCallback, useEffect, useState } from "react";
import { StatusPieChart, chartConfig } from "@/components";
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Dashboard() {
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

    const config = chartConfig[selectChart];

    const isTask = selectChart === 'tasks';
    const isNote = selectChart === 'notes';

    return (
        <div className="min-h-screen px-4 py-6 md:mt-1 -mt-45 bg-background text-foreground">
            <Card className="flex flex-col mt-38 md:mt-0 items-center justify-center md:max-w-4xl md:ml-65">

                <p className="text-3xl text-center mb-5 font-bold mt-5">
                    Dashboard de {isTask ? "Tarefas" : (isNote ? "Notas" : "Contatos")}
                </p>
                <Select
                    value={selectChart}
                    onValueChange={(value) => setSelectChart(value)}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="tasks">Tarefas</SelectItem>
                            <SelectItem value="contacts">Contatos</SelectItem>
                            <SelectItem value="notes">Notas</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Card>

            <div className="mt-10 max-w-4xl mx-auto space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <Card className="flex flex-col justify-center items-center">
                        <CardTitle className="text-md font-medium opacity-70">
                            Total
                        </CardTitle>
                        <CardContent>
                            <p className="text-3xl font-bold">
                                {isTask ? tasks.length : (isNote ? notes.length : contacts.length)}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col justify-center items-center">
                        <CardTitle className="text-md font-medium opacity-70 text-green-700">
                            {isTask ? "Concluídas" : (isNote ? "Fixadas" : "Favoritos")}
                        </CardTitle>
                        <CardContent>
                            <p className="text-3xl font-bold">
                                {isTask ? completed : (isNote ? pinned : favorite)}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col justify-center items-center">
                        <CardTitle className="text-md font-medium opacity-70 text-red-700">
                            {isTask ? "Não Concluídas" : (isNote ? "Não Fixadas" : "Não Favoritos")}
                        </CardTitle>
                        <CardContent>
                            <p className="text-3xl font-bold">
                                {isTask ? notCompleted : (isNote ? notPinned : notFavorite)}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="p-6 rounded-xl shadow" style={{ minHeight: 320 }}>
                    <StatusPieChart
                        items={isTask ? tasks : (isNote ? notes : contacts)}
                        booleanKey={config.booleanKey}
                        positiveLabel={config.positiveLabel}
                        negativeLabel={config.negativeLabel}
                    />
                </Card>
            </div>
        </div>
    )
};