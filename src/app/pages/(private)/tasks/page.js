/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useCallback, useEffect, useState } from 'react'
import { Header, TaskModal, TableItem } from '@/components';
import { useTheme } from '@/context';

export default function Tasks() {
    const { theme } = useTheme();

    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [modalMode, setModalMode] = useState(null)
    const [currentTask, setCurrentTask] = useState({ id: null, title: "" });

    function openCreateModal() {
        setCurrentTask({ id: null, title: "" });
        setModalMode("create");
    };
    function openEditModal(task) {
        setCurrentTask({ id: task.id, title: task.title });
        setModalMode("edit");
    };

    const loadTasks = useCallback(async () => {
        try {
            const res = await fetch(`/api/private/tasks?search=${search}`, { credentials: "include" });
            const data = await res.json();

            setTasks(Array.isArray(data) ? data : data.tasks || []);
        } catch (err) {
            console.error('Erro ao carregar tarefas', err)
            setTasks([])
        }
    }, [search]);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    async function toggleTasks(id) {
        await fetch(`/api/private/tasks/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        await loadTasks();
    };

    async function deleteTasks(id) {
        await fetch(`/api/private/tasks/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        await loadTasks();
    };

    async function handleSubmit() {
        if (!currentTask.title.trim()) return;

        switch (modalMode) {
            case "create":
                await fetch('/api/private/tasks', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ title: currentTask.title })
                });
                break;
            case "edit":
                await fetch(`/api/private/tasks/${currentTask.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ title: currentTask.title })
                });
        };
        setModalMode(null);
        await loadTasks();
    };

    return (
        <div
            className='flex flex-col flex-1 min-h-screen pb-16 px-2'
            style={{ backgroundColor: theme.card, color: theme.text }}
        >
            <Header
                title="Lista de Tarefas"
                buttonLabel="Adicionar Tarefa"
                onButtonClick={openCreateModal}
                searchValue={search}
                onSearchChange={setSearch}
            />

            {tasks.length === 0 ? (
                <h1 className="text-center text-lg font-semibold">Nenhuma tarefa encontrada</h1>
            ) : (
                <TableItem
                    data={tasks}
                    open={openEditModal}
                    toggle={toggleTasks}
                    deleteItem={deleteTasks}
                />
            )}

            <TaskModal
                isOpen={modalMode !== null}
                onClose={() => setModalMode(null)}
                onSubmit={handleSubmit}
                value={currentTask.title}
                setValue={(value) => setCurrentTask((prev) => ({ ...prev, title: value }))}
                mode={modalMode ?? "create"}
            />
        </div>
    )
};