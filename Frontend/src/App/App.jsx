import { FaCheck, FaReply, FaTrash, FaPencilAlt } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { api } from '../services/api'
import CreateTaskModal from '../components/CreateTaskModal'
import EditTaskModal from '../components/EditTaskModal'

function App() {

    const [title, setTitle] = useState('')
    const [tasks, setTasks] = useState([])
    const [isModalEditOpen, setIsModalEditOpen] = useState(false)
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false)
    const [editTitle, setEditTitle] = useState('')
    const [editId, setEditId] = useState(null)

    async function loadTasks() {
        try {
            const res = await api.get('/tasks');
            setTasks(res.data)
        } catch (err) {
            console.error('Erro ao carregar tarefas', err)
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
        <div className='container'>
            <h1>Lista de Tarefas</h1>

            <button className='open-modal' onClick={openModal}>
                Adicionar Tarefa
            </button>

            <hr />

            <ul>
                {tasks.map(task => (
                    <li
                        key={task.id}
                        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                    >
                        <span className='task-title'>
                            {task.title}
                        </span>

                        <span className='btn-actions'>
                            <button
                                title='Editar'
                                onClick={() => openEditModal(task)}
                            >
                                <FaPencilAlt />
                            </button>

                            <button
                                title={task.completed ? 'Desmarcar' : 'Concluída'}
                                onClick={() => toggleTasks(task.id)}
                            >
                                {task.completed ? <FaReply /> : <FaCheck />}
                            </button>

                            <button
                                title='Excluir'
                                onClick={() => deleteTasks(task.id)}
                            >
                                <FaTrash />
                            </button>
                        </span>
                    </li>
                ))}
            </ul>

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
        </div>
    )
};

export default App;