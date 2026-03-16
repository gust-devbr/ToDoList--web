/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useCallback, useEffect, useState } from 'react'
import { Header, ItemModal, TableFilter, CardList } from '@/components'
import { FaStar, FaRegStar } from "@/components/icons";
import { toast } from 'sonner';

const emptyContact = {
    id: null,
    name: "",
    email: "",
    tel: "",
    category: ""
};

export default function Contacts() {
    const [state, setState] = useState({
        contacts: [],
        search: "",
        filter: "",
        currentContact: emptyContact,
        modalMode: null
    });

    function openCreateModal() {
        setState(prev => ({
            ...prev,
            currentContact: emptyContact,
            modalMode: "create"
        }))
    };

    function openEditModal(contact) {
        setState(prev => ({
            ...prev,
            currentContact: {
                ...prev.currentContact,
                id: contact.id,
                name: contact.name,
                email: contact.email,
                tel: contact.tel,
                category: contact.category
            },
            modalMode: "edit"
        }))
    };

    const loadContacts = useCallback(async () => {
        try {
            const res = await fetch(`/api/private/contacts?search=${state.search}&status=${state.filter}`, { credentials: 'include' })
            const data = await res.json()

            setState(prev => ({
                ...prev,
                contacts: Array.isArray(data) ? data : data.contacts || []
            }));
        } catch {
            toast.error("Erro ao carregar");
            setState(prev => ({ ...prev, contacts: [] }));
        }
    }, [state.search, state.filter])


    async function deleteContact(id) {
        try {
            await fetch(`/api/private/contacts/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });

            loadContacts();
            toast.success("Contato excluído!");
        } catch {
            toast.error("Erro ao deletar");
        }
    };

    async function favoriteContact(id) {
        try {
            const contact = state.contacts.find((c) => c.id === id)
            if (!contact) return;

            await fetch(`/api/private/contacts/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ favorite: !contact.favorite })
            })
            await loadContacts();
            toast.success("Contato favoritado!");
        } catch {
            toast.error("Erro ao favoritar");
        }
    };

    async function handleSubmit() {
        try {
            const payload = {
                id: state.currentContact.id,
                name: state.currentContact.name,
                email: state.currentContact.email,
                tel: state.currentContact.tel,
                category: state.currentContact.category
            };

            if (!payload.name.trim() || !payload.email.trim() || !payload.tel.trim() || !payload.category.trim()) {
                toast.error("Complete os campos!");
                return;
            };

            switch (state.modalMode) {
                case "create":
                    await fetch('/api/private/contacts', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify(payload)
                    })
                    break;
                case "edit":
                    await fetch(`/api/private/contacts/${payload.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify(payload)
                    })
                    break;
            };

            setState(prev => ({ ...prev, modalMode: null }));
            await loadContacts();
            toast.success("Contato salvo!");
        } catch {
            toast.error("Erro ao salvar");
        }
    };

    useEffect(() => {
        loadContacts()
    }, [loadContacts])

    return (
        <div className='flex-1 h-screen px-3 md:mt-0 -mt-14 bg-card text-foreground'>
            <Header
                title="Lista de Contatos"
                buttonLabel="Adicionar Contato"
                onButtonClick={openCreateModal}
                searchValue={state.search}
                onSearchChange={(value) => setState(prev => ({ ...prev, search: value }))}
            />

            <TableFilter
                selectedPage="contacts"
                setFilter={(value) => setState(prev => ({ ...prev, filter: value }))}
            />

            {state.contacts.length === 0 ? (
                <h1 className='text-center text-lg font-semibold'>Nenhum contato encontrado</h1>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {state.contacts.map((contact) => (
                        <CardList
                            key={contact.id}
                            title={contact.name}
                            createdAt={contact.createdAt}
                            updatedAt={contact.updatedAt}
                            onRename={() => openEditModal(contact)}
                            onUpdate={() => favoriteContact(contact.id)}
                            onDelete={() => deleteContact(contact.id)}
                            MarkIcon={contact.favorite ? FaStar : FaRegStar}
                            MarkText={contact.favorite ? "Desfavoritar" : "Favoritar"}
                        >
                            <p>{contact.email}</p>
                            <p>{contact.tel}</p>
                            <p>{contact.category}</p>
                        </CardList>
                    ))}
                </div>
            )}

            <ItemModal
                isOpen={state.modalMode !== null}
                mode={state.modalMode ?? 'create'}
                itemType='contact'
                formData={state.currentContact}
                setFormData={(value) => setState(prev => ({
                    ...prev,
                    currentContact: typeof value === "function" ? value(prev.currentContact) : value
                }))}
                onClose={() => setState(prev => ({ ...prev, modalMode: null }))}
                onSubmit={handleSubmit}
            />
        </div>
    )
};