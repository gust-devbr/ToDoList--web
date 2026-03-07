/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useCallback, useEffect, useState } from 'react'
import { Header, ItemModal, TableItem, TableFilter } from '@/components'

export default function Tasks() {
    const [tasks, setTasks] = useState([])
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('all')
    const [modalMode, setModalMode] = useState(null)
    const [currentTask, setCurrentTask] = useState({ id: null, title: '' })

    function openCreateModal() {
        setCurrentTask({ id: null, title: '' })
        setModalMode('create')
    }

    function openEditModal(task) {
        setCurrentTask({ id: task.id, title: task.title })
        setModalMode('edit')
    }

    const loadTasks = useCallback(async () => {
        try {
            const res = await fetch(`/api/private/tasks?search=${search}&status=${filter}`, { credentials: 'include' })
            const data = await res.json()

            setTasks(Array.isArray(data) ? data : data.tasks || [])
        } catch (err) {
            console.error('Erro ao carregar tarefas', err)
            setTasks([])
        }
    }, [filter, search])


    async function toggleTasks(id) {
        await fetch(`/api/private/tasks/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        await loadTasks()
    }

    async function deleteTasks(id) {
        await fetch(`/api/private/tasks/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        await loadTasks()
    }

    async function handleSubmit() {
        if (!currentTask.title.trim()) return

        switch (modalMode) {
            case 'create':
                await fetch('/api/private/tasks', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ title: currentTask.title })
                })
                break
            case 'edit':
                await fetch(`/api/private/tasks/${currentTask.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ title: currentTask.title })
                })
                break
        }

        setModalMode(null)
        await loadTasks()
    }

    useEffect(() => {
        loadTasks()
    }, [loadTasks])


    return (
        <div className='flex-1 min-h-screen pb-16 px-3 md:mt-0 -mt-14  bg-card text-foreground'>
            <Header
                title='Lista de Tarefas'
                buttonLabel='Adicionar Tarefa'
                onButtonClick={openCreateModal}
                searchValue={search}
                onSearchChange={setSearch}
            />

            <TableFilter
                selectedPage='tasks'
                setFilter={setFilter}
            />

            {tasks.length === 0 ? (
                <h1 className='text-center text-lg font-semibold'>Nenhuma tarefa encontrada</h1>
            ) : (
                <TableItem
                    data={tasks}
                    open={openEditModal}
                    toggle={toggleTasks}
                    deleteItem={deleteTasks}
                />
            )}

            <ItemModal
                isOpen={modalMode !== null}
                mode={modalMode ?? 'create'}
                itemType='task'
                formData={currentTask}
                setFormData={setCurrentTask}
                onClose={() => setModalMode(null)}
                onSubmit={handleSubmit}
            />
        </div>
    )
}