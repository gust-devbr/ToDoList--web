import { useState, useEffect } from "react";
import CreateNoteModal from "@/components/CreateNoteModal";
import EditNoteModal from "@/components/EditNoteModal";
import { useTheme } from "@/context/ThemeContext";
import api from "@/services/api";
import { Header } from "@/components/Header";
import { TableItem } from "@/components/TableItem";

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
    const [search, setSearch] = useState("");

    const loadNotes = async () => {
        try {
            const res = await api.get('/notes', {
                params: { search: search }
            })
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

    function openModal() {
        setIsModalCreateOpen(true)
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
        const delay = setTimeout(() => {
            loadNotes()
        }, 400);

        return () => clearTimeout(delay);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    return (
        <div
            className="flex flex-col flex-1 min-h-screen px-2"
            style={{ backgroundColor: theme.card, color: theme.text }}
        >

            <Header
                title="Lista de Notas"
                buttonLabel="Adicionar Nota"
                onButtonClick={openModal}
                searchValue={search}
                onSearchChange={setSearch}
            />

            <hr className="mb-5 border-2" />

            {notes.length === 0 ? (
                <h1 className="text-center text-lg font-semibold">Nenhuma nota encontrada</h1>
            ) : (
                <TableItem
                    data={notes}
                    deleteItem={deleteNote}
                    open={openEditModal}
                />
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
                <div
                    className='mt-auto mb-10 md:mb-2 p-3 rounded-sm flex justify-between text-[14px]'
                    style={{ backgroundColor: theme.background }}
                >
                    <span style={{ color: theme.text }}>Total: {notes.length}</span>
                </div>
            )}
        </div>
    )
};