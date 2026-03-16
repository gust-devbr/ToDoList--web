/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useState, useEffect, useCallback } from 'react'
import { ItemModal, Header, TableFilter, CardList } from '@/components'
import { TbPinnedOff, TbPinned } from "@/components/icons";
import { toast } from 'sonner';

const emptyNote = {
    id: null,
    title: "",
    content: ""
};

export default function Notes() {
    const [state, setState] = useState({
        notes: [],
        search: "",
        filter: "all",
        modalMode: null,
        currentNote: emptyNote
    });

    function openCreateModal() {
        setState(prev => ({
            ...prev,
            currentNote: emptyNote,
            modalMode: "create"
        }))
    };

    function openEditModal(note) {
        if (!note.id) return;

        setState(prev => ({
            ...prev,
            currentNote: {
                id: note.id,
                title: note.title,
                content: note.content
            },
            modalMode: "edit"
        }))
    };

    const loadNotes = useCallback(async () => {
        try {
            const res = await fetch(`/api/private/notes?search=${state.search}&status=${state.filter}`, { credentials: 'include' })
            const data = await res.json()

            setState(prev => ({
                ...prev,
                notes: Array.isArray(data) ? data : data.notes || []
            }));
        } catch {
            toast.error("Erro ao carregar");
            setState(prev => ({ ...prev, notes: [] }));
        }
    }, [state.search, state.filter]);


    async function handleSubmit() {
        try {
            const payload = {
                id: state.currentNote.id,
                title: state.currentNote.title,
                content: state.currentNote.content
            };

            if (!payload.title.trim() || !payload.content.trim()) {
                toast.error("Complete os campos!");
                return;
            };

            switch (state.modalMode) {
                case "create":
                    await fetch('/api/private/notes', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify(payload)
                    })
                    break;
                case "edit":
                    await fetch(`/api/private/notes/${payload.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify(payload)
                    })
                    break;
            };

            setState(prev => ({ ...prev, modalMode: null }));
            await loadNotes();
            toast.success("Nota salva!");
        } catch {
            toast.error("Erro ao salvar");
        }
    };

    async function toggleNotes(id) {
        try {
            await fetch(`/api/private/notes/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })
            await loadNotes();
            toast.success("Nota fixada!");
        } catch {
            toast.error("Erro ao fixar");
        }
    };

    async function deleteNote(id) {
        try {
            await fetch(`/api/private/notes/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })
            await loadNotes();
            toast.success("Nota excluída");
        } catch {
            toast.error("Erro ao excluir");
        }
    };

    useEffect(() => {
        loadNotes()
    }, [loadNotes]);

    return (
        <div className='flex-1 min-h-screen px-3 md:mt-0 -mt-14 bg-card text-foreground'>
            <Header
                title="Lista de Notas"
                buttonLabel="Adicionar Nota"
                onButtonClick={openCreateModal}
                searchValue={state.search}
                onSearchChange={(value) => setState(prev => ({ ...prev, search: value }))}
            />

            <TableFilter
                selectedPage="notes"
                setFilter={(value) => setState(prev => ({ ...prev, filter: value }))}
            />

            {state.notes.length === 0 ? (
                <h1 className='text-center text-lg font-semibold'>Nenhuma nota encontrada</h1>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {state.notes.map((note) => (
                        <CardList
                            key={note.id}
                            title={note.title}
                            createdAt={note.createdAt}
                            updatedAt={note.updatedAt}
                            onRename={() => openEditModal(note)}
                            onUpdate={() => toggleNotes(note.id)}
                            onDelete={() => deleteNote(note.id)}
                            MarkIcon={note.pinned ? TbPinnedOff : TbPinned}
                            MarkText={note.pinned ? "Desfixar" : "Fixar"}
                        >
                            <p>{note.content}</p>
                        </CardList>
                    ))}
                </div>
            )}

            <ItemModal
                isOpen={state.modalMode !== null}
                mode={state.modalMode ?? 'create'}
                itemType='note'
                formData={state.currentNote}
                setFormData={(value) => setState(prev => ({
                    ...prev,
                    currentNote: typeof value === "function" ? value(prev.currentNote) : value
                }))}
                onClose={() => setState(prev => ({ ...prev, modalMode: null }))}
                onSubmit={handleSubmit}
            />
        </div>
    )
};