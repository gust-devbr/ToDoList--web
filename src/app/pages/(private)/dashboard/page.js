/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useCallback, useEffect, useState } from "react";
import { StatusPieChart, chartConfig } from "@/components";
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { api } from "@/components/utils/api";

export default function Dashboard() {
    const [selectChart, setSelectChart] = useState("tasks");
    const [tasks, setTasks] = useState([]);
    const [notes, setNotes] = useState([]);
    const [contacts, setContacts] = useState([]);

    const loadData = useCallback(async () => {
        try {
            switch (selectChart) {
                case "tasks":
                    const tasksData = await api("/private/tasks");
                    setTasks(Array.isArray(tasksData) ? tasksData : tasksData.tasks || []);
                    break;

                case "contacts":
                    const contactsData = await api("/private/contacts");
                    setContacts(Array.isArray(contactsData) ? contactsData : contactsData.contacts || []);
                    break;

                case "notes":
                    const notesData = await api("/private/notes");
                    setNotes(Array.isArray(notesData) ? notesData : notesData.notes || []);
                    break;
            }
        } catch {
            toast.error("Erro ao carregar dados");
            setTasks([]);
            setNotes([]);
            setContacts([]);
        }
    }, [selectChart]);

    useEffect(() => {
        loadData();
    }, [selectChart]);

    const countBoolean = (items, key) => items.filter(item => item[key]).length;

    const config = chartConfig[selectChart];
    const items = selectChart === "tasks" ? tasks : selectChart === "notes" ? notes : contacts;

    const positiveCount = countBoolean(items, config.booleanKey);
    const negativeCount = items.length - positiveCount;

    return (
        <div className="min-h-screen px-4 py-6 md:mt-1 -mt-45 bg-background text-foreground">
            <Card className="flex flex-col mt-38 md:mt-0 items-center justify-center md:max-w-4xl md:ml-65">

                <p className="text-3xl text-center mb-5 font-bold mt-5">
                    Dashboard de {selectChart === "tasks" ? "Tarefas" : selectChart === "notes" ? "Notas" : "Contatos"}
                </p>
                <Select value={selectChart} onValueChange={setSelectChart}>
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
                        <CardTitle className="text-md font-medium opacity-70"> Total</CardTitle>
                        <CardContent>
                            <p className="text-3xl font-bold">{items.length}</p>
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col justify-center items-center">
                        <CardTitle className="text-md font-medium opacity-70 text-green-700">
                            {selectChart === "tasks" ? "Concluídas" : selectChart === "notes" ? "Fixadas" : "Favoritos"}
                        </CardTitle>
                        <CardContent>
                            <p className="text-3xl font-bold">
                                {positiveCount}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col justify-center items-center">
                        <CardTitle className="text-md font-medium opacity-70 text-red-700">
                            {selectChart === "tasks" ? "Não Concluídas" : selectChart === "notes" ? "Não Fixadas" : "Não Favoritos"}
                        </CardTitle>
                        <CardContent>
                            <p className="text-3xl font-bold">
                                {negativeCount}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="p-6 rounded-xl shadow" style={{ minHeight: 320 }}>
                    <StatusPieChart
                        items={items}
                        booleanKey={config.booleanKey}
                        positiveLabel={config.positiveLabel}
                        negativeLabel={config.negativeLabel}
                    />
                </Card>
            </div>
        </div>
    )
};