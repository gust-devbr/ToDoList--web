import { useState, useEffect } from "react";
import { useTheme } from "@/context";
import { TableItem, NoteModal, Header } from "@/components";
import api from "@/services/api";

export default function Notes() {
    const { theme } = useTheme();

    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState("");
    const [modalMode, setModalMode] = useState(null);
    const [currentNote, setCurrentNote] = useState({
        id: null,
        title: "",
        content: ""
    });

    async function loadNotes() {
        try {
            const res = await api.get('/notes', {
                params: { search: search, },
            })
            setNotes(Array.isArray(res.data) ? res.data : res.data.notes || [])
        } catch (err) {
            console.error("Erro ao carrgar notas", err)
            setNotes([])
        }
    }

    async function handleSubmit() {
        const { id, title, content } = currentNote;
        if (!title.trim() || !content.trim()) return;

        try {
            if (modalMode === "edit" && id) {
                await api.put(`/notes/${id}`, { title, content });

                setNotes(prevNotes =>
                    prevNotes.map(note =>
                        note.id === id ? { ...note, title, content } : note
                    )
                );
            } else if (modalMode === "create") {
                await api.post("/notes", { title, content });
            }

            setModalMode(null);
            setTimeout(() => loadNotes(), 500);

        } catch (err) {
            console.error("Erro ao salvar:", err);
        }
    };

    async function deleteNote(id) {
        await api.delete(`/notes/${id}`)
        loadNotes()
    };

    function openCreateModal() {
        setCurrentNote({
            id: null,
            title: "",
            content: ""
        });

        setModalMode("create");
    };

    function openEditModal(note) {
        if (!note.id) return;

        setCurrentNote({
            id: note.id ?? "",
            title: note.title ?? "",
            content: note.content ?? ""
        });

        setModalMode("edit");
    };



    useEffect(() => {
        const delay = setTimeout(loadNotes, 400);
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
                onButtonClick={openCreateModal}
                searchValue={search}
                onSearchChange={setSearch}
            />

            {notes.length === 0 ? (
                <h1 className="text-center text-lg font-semibold">Nenhuma nota encontrada</h1>
            ) : (
                <TableItem
                    data={notes}
                    deleteItem={deleteNote}
                    open={openEditModal}
                />
            )}

            <NoteModal
                isOpen={modalMode !== null}
                onClose={() => setModalMode(null)}
                onSubmit={handleSubmit}
                titleValue={currentNote.title ?? ""}
                setTitleValue={(v) => setCurrentNote(prev => ({ ...prev, title: v }))}
                contentValue={currentNote.content ?? ""}
                setContentValue={(v) => setCurrentNote(prev => ({ ...prev, content: v }))}
                mode={modalMode ?? "create"}
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