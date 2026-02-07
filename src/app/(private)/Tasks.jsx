import { FaCheck, FaReply, FaTrash, FaPencilAlt } from 'react-icons/fa';
import { MdOutlineInfo } from "react-icons/md";
import { useEffect, useState } from 'react'
import api from '../../services/api'
import CreateTaskModal from '../../components/CreateTaskModal';
import EditTaskModal from '../../components/EditTaskModal'
import { useTheme } from '../../context/ThemeContext';
import { Header } from '../../components/Header';

function formatDate(date) {
    return new Date(date).toLocaleDateString("pt-BR");
};

export default function Tasks() {
    const { theme } = useTheme();

    const [title, setTitle] = useState('');
    const [tasks, setTasks] = useState([]);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState("");

    const [openInfoId, setOpenInfoId] = useState(false);

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

    async function createTasks() {
        if (!title) return;

        await api.post('/tasks', { title })
        setTitle('')
        loadTasks()
    }

    async function toggleTasks(id) {
        await api.patch(`/tasks/${id}`)
        loadTasks()
    }

    async function deleteTasks(id) {
        await api.delete(`/tasks/${id}`)
        loadTasks()
    }

    function openModal() {
        setIsModalCreateOpen(true)
    }

    function openEditModal(task) {
        setEditId(task.id)
        setEditTitle(task.title)
        setIsModalEditOpen(true)
    }

    async function saveEdit() {
        if (!editTitle.trim()) return;

        await api.put(`/tasks/${editId}`, {
            title: editTitle
        });
        setIsModalEditOpen(false)
        loadTasks()
    }

    useEffect(() => {
        const delay = setTimeout(() => {
            loadTasks()
        }, 400);

        return () => clearTimeout(delay);
    }, [search])

    return (
        <div
            className='flex-1 p-6 min-h-screen min-w-screen'
            style={{ backgroundColor: theme.card, color: theme.text }}
        >

            <Header
                title="Lista de Tarefas"
                buttonLabel="Adicionar Tarefa"
                onButtonClick={openModal}
                searchValue={search}
                onSearchChange={setSearch}
            />

            <hr />

            {tasks.length === 0 ? (
                <p className='text-center mt-3'>Nenhuma tarefa encontrada</p>
            ) : (
                <ul>
                    {tasks?.map(task => (
                        <li key={task.id} className='flex justify-between items-center p-1 gap-10' >

                            <span className='flex flex-col'>
                                <span className='flex items-center gap-1'>

                                    <button onClick={() => setOpenInfoId(openInfoId === task.id ? null : task.id)}>
                                        <MdOutlineInfo size={16} />
                                    </button>

                                    <span
                                        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                                        className='text-[18px] font-bold flex-1 wrap-break-word mr-12.5'
                                    >
                                        {task.title}
                                    </span>
                                </span>

                                {openInfoId === task.id && (
                                    <p className='flex flex-col text-sm ml-5'>
                                        Criada em <strong>{formatDate(task.created_at)}</strong>
                                        Atualizada em <strong>{formatDate(task.updated_at)}</strong>
                                    </p>
                                )}
                            </span>

                            <span className='flex gap-3'>
                                <button
                                    className='bg-transparent border-none cursor-pointer text-[20px]'
                                    style={{ color: theme.text }}
                                    title='Editar'
                                    onClick={() => openEditModal(task)}
                                >
                                    <FaPencilAlt />
                                </button>

                                <button
                                    className='bg-transparent border-none cursor-pointer text-[22px]'
                                    style={{ color: theme.checkIcon }}
                                    title={task.completed ? 'Desmarcar' : 'Concluída'}
                                    onClick={() => toggleTasks(task.id)}
                                >
                                    {task.completed ? <FaReply /> : <FaCheck />}
                                </button>

                                <button
                                    className='bg-transparent border-none cursor-pointer text-[20px]'
                                    style={{ color: theme.icon }}
                                    title='Excluir'
                                    onClick={() => deleteTasks(task.id)}
                                >
                                    <FaTrash />
                                </button>
                            </span>
                        </li>
                    ))}
                </ul>
            )}

            <CreateTaskModal
                isOpen={isModalCreateOpen}
                onClose={() => setIsModalCreateOpen(false)}
                onCreate={createTasks}
                value={title}
                setValue={setTitle}
            />

            <EditTaskModal
                isOpen={isModalEditOpen}
                onClose={() => setIsModalEditOpen(false)}
                onRename={saveEdit}
                value={editTitle}
                setValue={setEditTitle}
            />

            {tasks.length > 0 && (
                <div
                    className='mt-auto mb-10 lg:mb-0 p-3 rounded-sm flex justify-between text-[14px]'
                    style={{ backgroundColor: theme.background }}
                >
                    <span style={{ color: theme.text }}>Total: {tasks.length}</span>
                    <span style={{ color: theme.text }}>Concluídas: {tasks.filter((t) => t.completed).length}</span>
                </div>
            )}
        </div>
    )
};