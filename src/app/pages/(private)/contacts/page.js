/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useCallback, useEffect, useState } from 'react'
import { Header, ItemModal, TableFilter, CardList } from '@/components'
import { FaStar, FaRegStar } from "@/components/icons";

const emptyContact = {
    id: null,
    name: '',
    email: '',
    tel: '',
    category: ''
}

export default function Contacts() {
    const [contacts, setContacts] = useState([])
    const [modalMode, setModalMode] = useState(null)
    const [currentContact, setCurrentContact] = useState(emptyContact)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('all')

    function openCreateModal() {
        setCurrentContact(emptyContact)
        setModalMode('create')
    }

    function openEditModal(contact) {
        setCurrentContact({
            id: contact.id ?? null,
            name: contact.name ?? '',
            email: contact.email ?? '',
            tel: contact.tel ?? '',
            category: contact.category ?? ''
        })
        setModalMode('edit')
    }

    const loadContacts = useCallback(async () => {
        try {
            const res = await fetch(`/api/private/contacts?search=${search}&status=${filter}`, { credentials: 'include' })
            const data = await res.json()
            setContacts(Array.isArray(data) ? data : data.contacts || [])
        } catch (err) {
            console.error('Erro ao carregar contatos', err)
            setContacts([])
        }
    }, [search, filter])


    async function deleteContact(id) {
        try {
            await fetch(`/api/private/contacts/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })

            loadContacts()
        } catch (err) {
            console.error('Erro ao deletar contato', err)
        }
    }

    async function favoriteContact(id) {
        try {
            const contact = contacts.find((c) => c.id === id)
            if (!contact) return

            await fetch(`/api/private/contacts/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ favorite: !contact.favorite })
            })
            await loadContacts()
        } catch (err) {
            console.error('Erro ao favoritar', err)
        }
    }

    async function handleSubmit() {
        try {
            if (!currentContact.name.trim()) return

            const payload = {
                name: currentContact.name,
                email: currentContact.email,
                tel: currentContact.tel,
                category: currentContact.category
            }

            switch (modalMode) {
                case 'create':
                    await fetch('/api/private/contacts', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify(payload)
                    })
                    break
                case 'edit':
                    await fetch(`/api/private/contacts/${currentContact.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify(payload)
                    })
                    break
            }

            setModalMode(null)
            await loadContacts()
        } catch (err) {
            console.error('Erro ao salvar', err)
        }
    }

    useEffect(() => {
        loadContacts()
    }, [loadContacts])

    return (
        <div className='flex-1 h-screen px-3 md:mt-0 -mt-14 bg-card text-foreground'>
            <Header
                title='Lista de Contatos'
                buttonLabel='Adicionar Contato'
                onButtonClick={openCreateModal}
                searchValue={search}
                onSearchChange={setSearch}
            />

            <TableFilter
                selectedPage='contacts'
                setFilter={setFilter}
            />

            {contacts.length === 0 ? (
                <h1 className='text-center text-lg font-semibold'>
                    Nenhum contato encontrado
                </h1>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {contacts.map((contact) => (
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
                isOpen={modalMode !== null}
                mode={modalMode ?? 'create'}
                itemType='contact'
                formData={currentContact}
                setFormData={setCurrentContact}
                onClose={() => setModalMode(null)}
                onSubmit={handleSubmit}
            />
        </div>
    )
}