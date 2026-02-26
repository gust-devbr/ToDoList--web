/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useState, useEffect } from "react";
import { useTheme } from "@/context";
import { TableItem, NoteModal, Header } from "@/components";

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

    function openCreateModal() {
        setCurrentNote({ id: null, title: "", content: "" });
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

    async function loadNotes() {
        try {
            const res = await fetch(`/api/private/notes?search=${search}`, { credentials: "include" });
            const data = await res.json();

            setNotes(Array.isArray(data) ? data : data.notes || []);
        } catch (err) {
            console.error("Erro ao carrgar notas", err)
            setNotes([])
        }
    };

    async function handleSubmit() {
        try {
            const { id, title, content } = currentNote;
            if (!title.trim() || !content.trim()) return;

            switch (modalMode) {
                case "create":
                    await fetch("/api/private/notes", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify({ title, content })
                    });
                    break;
                case "edit":
                    await fetch(`/api/private/notes/${id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify({ title, content })
                    });
            }
            setModalMode(null);
            loadNotes();
        } catch (err) {
            console.error("Erro ao salvar", err);
        }
    };

    async function deleteNote(id) {
        await fetch(`/api/private/notes/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        loadNotes();
    };

    useEffect(() => {
        const delay = setTimeout(loadNotes, 400);
        return () => clearTimeout(delay);
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
        </div>
    )
};