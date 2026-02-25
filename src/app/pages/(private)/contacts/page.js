'use client'

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTheme } from "@/context";
import { Header, TableContact, ContactModal } from "@/components";

export default function Contacts() {
    const { theme } = useTheme();

    const [contacts, setContacts] = useState([]);
    const [modalMode, setModalMode] = useState(null);
    const [selectedContact, setSelectedContact] = useState(null);
    const [search, setSearch] = useState("");

    async function loadContacts() {
        try {
            const res = await fetch(`/api/private/contacts?search=${search}`, {
                credentials: "include"
            });
            const data = await res.json();

            setContacts(Array.isArray(data) ? data : data.contacts || []);
        } catch (err) {
            console.error("Erro ao carregar contatos", err);
            setContacts([]);
        }
    }

    useEffect(() => {
        const delay = setTimeout(loadContacts, 100);
        return () => clearTimeout(delay);
    }, [search]);

    function openCreateModal() {
        setSelectedContact(null);
        setModalMode("create");
    }

    function openEditModal(contact) {
        setSelectedContact(contact);
        setModalMode("edit");
    }

    async function deleteContact(id) {
        try {
            await fetch(`/api/private/contacts/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            setContacts(prev => prev.filter(c => c.id !== id));
        } catch (err) {
            console.error("Erro ao deletar contato", err);
        }
    };

    async function favoriteContact(id) {
        try {
            const contact = contacts.find(c => c.id === id);
            if (!contact) return;

            const newFavorite = typeof contact.favorite === "boolean" ? !contact.favorite : true;

            await fetch(`/api/private/contacts/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ favorite: newFavorite })
            });

            loadContacts();
        } catch (err) {
            console.error("Erro ao favoritar", err);
        }
    }

    async function handleSave(contactData, id) {
        try {
            if (modalMode === "edit" && id) {
                await fetch(`/api/private/contacts/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(contactData)
                });

                loadContacts();
            } else {
                await fetch("/api/private/contacts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(contactData)
                });
                loadContacts();
            }

            setModalMode(null);
        } catch (err) {
            console.error("Erro ao salvar", err);
        }
    }

    return (
        <div
            className="flex flex-col flex-1 min-h-screen px-2"
            style={{ backgroundColor: theme.card, color: theme.text }}
        >
            <Header
                title="Lista de Contatos"
                buttonLabel="Adicionar Contato"
                onButtonClick={openCreateModal}
                searchValue={search}
                onSearchChange={setSearch}
            />

            {contacts.length === 0 ? (
                <h1 className="text-center text-lg font-semibold">
                    Nenhum contato encontrado
                </h1>
            ) : (
                <TableContact
                    data={contacts}
                    open={openEditModal}
                    toggle={favoriteContact}
                    onDelete={deleteContact}
                />
            )}

            <ContactModal
                isOpen={modalMode !== null}
                mode={modalMode ?? "create"}
                contact={selectedContact}
                onClose={() => setModalMode(null)}
                onSave={handleSave}
            />
        </div>
    )
};