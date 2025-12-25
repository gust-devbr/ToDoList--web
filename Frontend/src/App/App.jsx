import { FaCheck, FaReply, FaTrash, FaPencilAlt } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import CreateTaskModal from '../components/CreateTaskModal'
import { api } from '../services/api'
import EditTaskModal from '../components/EditTaskModal'

function App() {

    const [title, setTitle] = useState('')
    const [tasks, setTasks] = useState([])
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false)
    const [isModalEditOpen, setIsModalEditOpen] = useState(false)
    const [editTitle, setEditTitle] = useState('')
    const [editId, setEditId] = useState([])

    async function loadTasks() {
        const res = await api.get('/tasks');
        setTasks(res.data)
    };

    async function createTasks() {
        if (!title) return;

        await api.post('/tasks', { title });
        setTitle('')
        loadTasks()
    };

    async function toggleTasks(id) {
        await api.patch(`/tasks/${id}`)
        loadTasks()
    };

    async function deleteTasks(id) {
        await api.delete(`/tasks/${id}`)
        loadTasks()
    };

    function openModal() {
        setIsModalCreateOpen(true)
    };

    function openEditModal(task) {
        setEditTitle(task.title)
        setEditId(task.id)
        setIsModalEditOpen(true)
    }

    async function saveEdit() {
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

            <button
                className='open-modal'
                onClick={() => openModal()}
            >
                Nova Tarefa
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