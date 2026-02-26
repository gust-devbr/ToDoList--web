/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useCallback, useEffect, useState } from "react";
import { useTheme } from "@/context";
import { Header, TableContact, ContactModal } from "@/components";

export default function Contacts() {
    const { theme } = useTheme();

    const [contacts, setContacts] = useState([]);
    const [modalMode, setModalMode] = useState(null);
    const [selectedContact, setSelectedContact] = useState(null);
    const [search, setSearch] = useState("");

    function openCreateModal() {
        setSelectedContact(null);
        setModalMode("create");
    };
    function openEditModal(contact) {
        setSelectedContact(contact);
        setModalMode("edit");
    };

    const loadContacts = useCallback(async () => {
        try {
            const res = await fetch(`/api/private/contacts?search=${search}`, { credentials: "include" });
            const data = await res.json();
            setContacts(Array.isArray(data) ? data : data.contacts || []);
        } catch (err) {
            console.error("Erro ao carregar contatos", err);
            setContacts([]);
        }
    }, [search]);

    useEffect(() => {
        loadContacts();
    }, [loadContacts]);

    async function deleteContact(id) {
        try {
            await fetch(`/api/private/contacts/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            loadContacts()
        } catch (err) {
            console.error("Erro ao deletar contato", err);
        }
    };

    async function favoriteContact(id) {
        try {
            const contact = contacts.find(c => c.id === id);
            if (!contact) return;

            await fetch(`/api/private/contacts/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ favorite: !contact.favorite })
            });
            await loadContacts();
        } catch (err) {
            console.error("Erro ao favoritar", err);
        }
    };

    async function handleSave(contactData, id) {
        try {
            switch (modalMode) {
                case "create":
                    await fetch("/api/private/contacts", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify(contactData)
                    });
                    break;
                case "edit":
                    await fetch(`/api/private/contacts/${id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify(contactData)
                    });
                    break;
            };
            setModalMode(null);
            await loadContacts();
        } catch (err) {
            console.error("Erro ao salvar", err);
        }
    };

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