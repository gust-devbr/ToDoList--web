import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import CreateNoteModal from "../../components/CreateNoteModal";
import EditNoteModal from "../../components/EditNoteModal";
import { useTheme } from "../../context/ThemeContext";
import api from "../../services/api";

export default function Notes() {
    const { theme } = useTheme();

    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [editId, setEditId] = useState(null);

    const loadNotes = async () => {
        try {
            const res = await api.get('/notes')
            setNotes(Array.isArray(res.data) ? res.data : res.data.notes || [])
        } catch (err) {
            console.error("Erro ao carrgar notas", err)
            setNotes([])
        }
    }

    const createNote = async () => {
        if (!title || !content) return;

        await api.post('/notes', { title, content })
        setTitle('')
        setContent('')
        loadNotes()
    };

    const deleteNote = async (id) => {
        await api.delete(`/notes/${id}`)
        loadNotes()
    };

    const openEditModal = (note) => {
        setEditId(note.id)
        setEditTitle(note.title)
        setEditContent(note.content)
        setIsModalEditOpen(true)
    };

    const saveEdit = async () => {
        if (!editTitle.trim() || !editContent.trim()) return;
        await api.put(`/notes/${editId}`, { title: editTitle, content: editContent })
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.id === editId ? { ...note, title: editTitle, content: editContent } : note
            )
        );
        setIsModalEditOpen(false)
    };

    useEffect(() => {
        loadNotes()
    }, []);

    return (
        <div
            className='flex flex-col px-4 py-5 shadow-2xl w-full min-w-screen min-h-screen'
            style={{ backgroundColor: theme.card, color: theme.text }}
        >
            <p className='text-3xl text-center mb-8 font-bold mt-5'>
                Lista de Notas
            </p>

            <button
                className='text-xl w-full border-none rounded-[5px] py-2 px-8 bg-green-700 text-white hover:bg-green-600 mb-5'
                onClick={() => setIsModalCreateOpen(true)}
            >
                Adicionar Nota
            </button>

            <hr />

            {notes.length === 0 ? (
                <p className="text-center mt-3">Nenhuma nota encontrada</p>
            ) : (
                <ul>
                    {notes.map(note => (
                        <li
                            className='flex justify-between items-center p-1 gap-10'
                            key={note.id}
                        >
                            <span className='text-[17px] font-bold flex-1 wrap-break-word mr-12.5'>
                                {note.title} --- {note.content}
                            </span>

                            <span className="flex gap-3">
                                <button
                                    className='bg-transparent border-none cursor-pointer text-[20px]'
                                    onClick={() => openEditModal(note)}
                                    style={{ color: theme.text }}
                                    title="Editar"
                                >
                                    <FaPencilAlt />
                                </button>

                                <button
                                    className='bg-transparent border-none cursor-pointer text-[20px]'
                                    onClick={() => deleteNote(note.id)}
                                    style={{ color: theme.icon }}
                                    title="Excluir"
                                >
                                    <FaTrash />
                                </button>
                            </span>
                        </li>
                    ))}
                </ul>
            )}

            <CreateNoteModal
                isOpen={isModalCreateOpen}
                onClose={() => setIsModalCreateOpen(false)}
                onCreate={createNote}
                titleValue={title}
                contentValue={content}
                setTitleValue={setTitle}
                setContentValue={setContent}
            />

            <EditNoteModal
                isOpen={isModalEditOpen}
                onClose={() => setIsModalEditOpen(false)}
                onEdit={saveEdit}
                titleValue={editTitle}
                contentValue={editContent}
                setTitleValue={setEditTitle}
                setContentValue={setEditContent}
            />

            {notes.length > 0 && (
                <div className='mt-auto mb-10 lg:mb-0 p-3 rounded-sm flex justify-between text-[14px]' style={{ backgroundColor: theme.background }}>
                    <span style={{ color: theme.text }}>Total: {notes.length}</span>
                </div>
            )}
        </div>
    )
};