/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useCallback, useEffect, useState } from 'react'
import { Header, ItemModal, TableFilter, CardList } from '@/components'
import { FaCheck, FaReply } from 'react-icons/fa'
import { toast } from 'sonner';

export default function Tasks() {
    const [state, setState] = useState({
        tasks: [],
        search: "",
        filter: "all",
        modalMode: null,
        currentTask: { id: null, title: "" }
    });

    function openCreateModal() {
        setState(prev => ({
            ...prev,
            currentTask: {
                ...prev.currentTask,
                id: null,
                title: ""
            },
            modalMode: "create"
        }))
    };

    function openEditModal(task) {
        setState(prev => ({
            ...prev,
            currentTask: {
                ...prev.currentTask,
                id: task.id,
                title: task.title
            },
            modalMode: "edit"
        }))
    };

    const loadTasks = useCallback(async () => {
        try {
            const res = await fetch(`/api/private/tasks?search=${state.search}&status=${state.filter}`, { credentials: 'include' })
            const data = await res.json();

            setState(prev => ({
                ...prev,
                tasks: Array.isArray(data) ? data : data.tasks || []
            }));
        } catch {
            setState(prev => ({ ...prev, tasks: [] }));
            toast.error("Erro ao carregar");
        }
    }, [state.filter, state.search])


    async function toggleTasks(id) {
        try {
            await fetch(`/api/private/tasks/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })
            await loadTasks();
            toast.success("Tarefa concluída");
        } catch {
            toast.error("Erro ao completar");
        }
    };

    async function deleteTasks(id) {
        try {
            await fetch(`/api/private/tasks/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })
            await loadTasks();
            toast.success("Tarefa excluída");
        } catch {
            toast.error("Erro ao excluir");
        }
    };

    async function handleSubmit() {
        try {
            if (!state.currentTask.title.trim()) {
                toast.error("Complete o campo!");
                return;
            };

            switch (state.modalMode) {
                case "create":
                    await fetch('/api/private/tasks', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify({ title: state.currentTask.title })
                    })
                    break;
                case "edit":
                    await fetch(`/api/private/tasks/${state.currentTask.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify({ title: state.currentTask.title })
                    })
                    break;
            };
            setState(prev => ({ ...prev, modalMode: null }));
            await loadTasks();
            toast.success("Tarefa salva!");
        } catch {
            toast.error("Erro ao salvar");
        }
    };

    useEffect(() => {
        loadTasks()
    }, [loadTasks]);


    return (
        <div className='flex-1 min-h-screen pb-16 px-3 md:mt-0 -mt-14 bg-card text-foreground'>
            <Header
                title="Lista de Tarefas"
                buttonLabel="Adicionar Tarefa"
                onButtonClick={openCreateModal}
                searchValue={state.search}
                onSearchChange={(value) => setState(prev => ({ ...prev, search: value }))}
            />

            <TableFilter
                selectedPage="tasks"
                setFilter={(value) => setState(prev => ({ ...prev, filter: value }))}
            />

            {state.tasks.length === 0 ? (
                <h1 className='text-center text-lg font-semibold'>Nenhuma tarefa encontrada</h1>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {state.tasks.map((task) => (
                        <CardList
                            key={task.id}
                            title={task.title}
                            createdAt={task.createdAt}
                            updatedAt={task.updatedAt}
                            onRename={() => openEditModal(task)}
                            onUpdate={() => toggleTasks(task.id)}
                            onDelete={() => deleteTasks(task.id)}
                            MarkIcon={task.completed ? FaReply : FaCheck}
                            MarkText={task.completed ? "Desmarcar" : "Marcar"}
                        />
                    ))}
                </div>
            )}

            <ItemModal
                isOpen={state.modalMode !== null}
                mode={state.modalMode ?? "create"}
                itemType="task"
                formData={state.currentTask}
                setFormData={(value) =>
                    setState(prev => ({
                        ...prev,
                        currentTask: typeof value === "function" ? value(prev.currentTask) : value
                    }))}
                onClose={() => setState(prev => ({ ...prev, modalMode: null }))}
                onSubmit={handleSubmit}
            />
        </div>
    )
};