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
        <div style={{ ...styles.container, backgroundColor: theme.card, color: theme.text }}>

            <div style={{...styles.header, color: theme.text }}>
                <h3>Olá, {user.nome}</h3>
                <button
                    style={{...styles.btnSettings, color: theme.text }}
                    type='button'
                    title='Configurações'
                    onClick={() => navigate("/settings")}
                >
                    <FaCog />
                </button>
            </div>

            <hr />
            <p style={{...styles.title}}>Lista de Tarefas</p>

            <button style={{...styles.btnOpenModal }} onClick={openModal}>
                Adicionar Tarefa
            </button>

            <hr />

            <ul>
                {tasks?.map(task => (
                    <li
                        key={task.id}
                        style={{...styles.li, textDecoration: task.completed ? 'line-through' : 'none' }}
                    >
                        <span style={{...styles.taskTitle}}>
                            {task.title}
                        </span>

                        <span>
                            <button
                                style={{ ...styles.actionsButtons, color: theme.text }}
                                title='Editar'
                                onClick={() => openEditModal(task)}
                            >
                                <FaPencilAlt />
                            </button>

                            <button
                                style={{ ...styles.actionsButtons, color: theme.checkIcon }}
                                title={task.completed ? 'Desmarcar' : 'Concluída'}
                                onClick={() => toggleTasks(task.id)}
                            >
                                {task.completed ? <FaReply /> : <FaCheck />}
                            </button>

                            <button
                                style={{ ...styles.actionsButtons,color: theme.icon }}
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

            {tasks.length > 0 && (
                <div style={{...styles.statusBar, backgroundColor: theme.background }}>
                    <span style={{ color: theme.text }}>Total: {tasks.length}</span>
                    <span style={{ color: theme.text }}>Concluídas: {tasks.filter((t) => t.completed).length}</span>
                </div>
            )}
        </div>
    )
};

const styles = {
    container: {
        border: 'none',
        borderRadius: '20px',
        padding: '15px',
        boxShadow: '2px 2px 15px',
        maxWidth: '500px',
        minWidth: '400px',
    },
    title: {
        fontSize: '28px',
        textAlign: 'center',
        marginBottom: '30px',
        fontWeight: 'bold',
    },
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        gap: '10px',
    },
    actionsButtons: {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '20px',
    },
    statusBar: {
        marginTop: '5%',
        padding: '10px',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '14px',
    },
    taskTitle: {
        fontSize: '17px',
        fontWeight: 'bold',
        flex: '1',
        wordBreak: 'break-word',
        marginLeft: '-40px',
        marginRight: '50px',
    },
    btnOpenModal: {
        width: '100%',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 25px',
        backgroundColor: 'rgb(0, 100, 0)', 
        color: '#FFF',
        fontSize: '15px',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btnSettings: {
        background: 'transparent',
        border: 'none',
        fontSize: '20px',
    },
};