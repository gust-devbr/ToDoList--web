import { useEffect, useState } from 'react'
import { Header, TaskModal, TableItem } from '@/components';
import { useTheme } from '@/context';
import api from '@/services/api'

export default function Tasks() {
    const { theme } = useTheme();

    const [tasks, setTasks] = useState([]);
    const [modalMode, setModalMode] = useState(null)
    const [currentTask, setCurrentTask] = useState({
        id: null,
        title: ""
    });

    const [search, setSearch] = useState("");

    async function loadTasks() {
        try {
            const res = await api.get('/tasks', {
                params: { search: search }
            });
            setTasks(Array.isArray(res.data) ? res.data : res.data.tasks || [])
        } catch (err) {
            console.error('Erro ao carregar tarefas', err)
            setTasks([])
        }
    }

    async function toggleTasks(id) {
        await api.patch(`/tasks/${id}`)
        loadTasks()
    }

    async function deleteTasks(id) {
        await api.delete(`/tasks/${id}`)
        loadTasks()
    }

    function openCreateModal() {
        setCurrentTask({ id: null, title: "" });
        setModalMode("create");
    }

    async function handleSubmit() {
        if (!currentTask.title.trim()) return;

        if (modalMode === "create") {
            await api.post('/tasks', {
                title: currentTask.title
            });
        }

        if (modalMode === "edit" && currentTask.id) {
            await api.put(`/tasks/${currentTask.id}`, {
                title: currentTask.title
            });
        }

        setModalMode(null);
        loadTasks();
    }

    function openEditModal(task) {
        setCurrentTask({
            id: task.id,
            title: task.title
        });

        setModalMode("edit");
    }

    useEffect(() => {
        const delay = setTimeout(() => {
            loadTasks()
        }, 400);

        return () => clearTimeout(delay);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

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