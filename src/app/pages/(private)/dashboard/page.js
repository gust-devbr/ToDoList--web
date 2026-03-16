/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useCallback, useEffect, useState } from "react";
import { StatusPieChart, chartConfig } from "@/components";
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function Dashboard() {
    const [state, setState] = useState({
        tasks: [],
        notes: [],
        contacts: [],
        selectChart: "tasks"
    });

    const loadData = useCallback(async () => {
        let data;
        let res;

        try {
            switch (state.selectChart) {
                case "tasks":
                    res = await fetch("/api/private/tasks", {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    });
                    data = await res.json();
                    setState(prev => ({ ...prev, tasks: Array.isArray(data) ? data : data.tasks || [] }));
                    break;

                case "contacts":
                    res = await fetch("/api/private/contacts", {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    });
                    data = await res.json();
                    setState(prev => ({ ...prev, contacts: Array.isArray(data) ? data : data.contacts || [] }));
                    break;

                case "notes":
                    res = await fetch("/api/private/notes", {
                        method: "GET",
                        headers: { "Content-Type": "application/json" }
                    });
                    data = await res.json();
                    setState(prev => ({ ...prev, notes: Array.isArray(data) ? data : data.notes || [] }));
                    break;
            }
        } catch {
            toast.error("Erro ao carregar dados");
            setState(prev => ({
                ...prev,
                tasks: [],
                notes: [],
                contacts: []
            }));
        }
    }, [state.selectChart]);

    useEffect(() => {
        if (state.selectChart) loadData();
    }, [loadData]);

    //Tasks
    const completed = state.tasks.filter(t => t.completed).length;
    const notCompleted = state.tasks.length - completed;

    //Contacts
    const favorite = state.contacts.filter(c => c.favorite).length;
    const notFavorite = state.contacts.length - favorite;

    //Notes
    const pinned = state.notes.filter(n => n.pinned).length;
    const notPinned = state.notes.length - pinned;

    const config = chartConfig[state.selectChart];

    const isTask = state.selectChart === 'tasks';
    const isNote = state.selectChart === 'notes';

    return (
        <div className="min-h-screen px-4 py-6 md:mt-1 -mt-45 bg-background text-foreground">
            <Card className="flex flex-col mt-38 md:mt-0 items-center justify-center md:max-w-4xl md:ml-65">

                <p className="text-3xl text-center mb-5 font-bold mt-5">
                    Dashboard de {isTask ? "Tarefas" : (isNote ? "Notas" : "Contatos")}
                </p>
                <Select
                    value={state.selectChart}
                    onValueChange={(value) => setState(prev => ({ ...prev, selectChart: value }))}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="tasks">Tarefas</SelectItem>
                            <SelectItem value="notes">Notas</SelectItem>
                            <SelectItem value="contacts">Contatos</SelectItem>
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
                                {isTask ? state.tasks.length : (isNote ? state.notes.length : state.contacts.length)}
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
                        items={isTask ? state.tasks : (isNote ? state.notes : state.contacts)}
                        booleanKey={config.booleanKey}
                        positiveLabel={config.positiveLabel}
                        negativeLabel={config.negativeLabel}
                    />
                </Card>
            </div>
        </div>
    )
};