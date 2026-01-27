import { FaCheck, FaReply, FaTrash, FaPencilAlt, FaCog } from 'react-icons/fa';
import { useEffect, useState } from 'react'
import api from '../../services/api'
import CreateTaskModal from '../../components/CreateTaskModal';
import EditTaskModal from '../../components/EditTaskModal'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export default function Tasks() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const { theme } = useTheme();

    const [title, setTitle] = useState('')
    const [tasks, setTasks] = useState([])
    const [isModalEditOpen, setIsModalEditOpen] = useState(false)
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false)
    const [editTitle, setEditTitle] = useState('')
    const [editId, setEditId] = useState(null)

    async function loadTasks() {
        try {
            const res = await api.get('/tasks');
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
        loadTasks()
    }, [])

    return (
        <div
            className='border-none rounded-3xl p-10 shadow-2xl max-w-200 min-w-100'
            style={{ backgroundColor: theme.card, color: theme.text }}
        >

            <div
                className='flex flex-row justify-between items-center mb-2'
                style={{ color: theme.text }}
            >
                <h3>Olá, {user.nome}</h3>
                <button
                    className='bg-transparent border-none text-2xl'
                    style={{ color: theme.text }}
                    type='button'
                    title='Configurações'
                    onClick={() => navigate("/settings")}
                >
                    <FaCog />
                </button>
            </div>

            <hr />
            <p className='text-3xl text-center mb-8 font-bold mt-5'>
                Lista de Tarefas
            </p>

            <button
                className='text-xl w-full border-none rounded-[5px] py-2 px-8 bg-green-700 text-white hover:bg-green-600 mb-5'
                onClick={openModal}>
                Adicionar Tarefa
            </button>

            <hr />

            {tasks.length === 0 ? (
                <p className='text-center mt-3'>Nenhuma tarefa encontrada</p>
            ) : (
                <ul>
                    {tasks?.map(task => (
                        <li
                            className='flex justify-between items-center p-1 gap-10'
                            key={task.id}
                            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                        >
                            <span className='text-[17px] font-bold flex-1 wrap-break-word mr-12.5'>
                                {task.title}
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
                    className='mt-8 p-3 rounded-sm flex justify-between text-[14px]'
                    style={{ backgroundColor: theme.background }}
                >
                    <span style={{ color: theme.text }}>Total: {tasks.length}</span>
                    <span style={{ color: theme.text }}>Concluídas: {tasks.filter((t) => t.completed).length}</span>
                </div>
            )}
        </div>
    )
};