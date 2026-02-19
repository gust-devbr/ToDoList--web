/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Header, TableContact, ContactModal } from "@/components";
import { useTheme } from "@/context";
import api from "@/services/api";

export default function Contacts() {
    const { theme } = useTheme();

    const [contacts, setContacts] = useState([]);
    const [modalMode, setModalMode] = useState(null);
    const [selectedContact, setSelectedContact] = useState(null);
    const [search, setSearch] = useState("");

    async function loadContacts() {
        try {
            const res = await api.get("/contacts", {
                params: { search }
            });

            setContacts(
                Array.isArray(res.data)
                    ? res.data
                    : res.data.contacts || []
            );
        } catch (err) {
            console.error("Erro ao carregar contatos", err);
            setContacts([]);
        }
    }

    useEffect(() => {
        const delay = setTimeout(loadContacts, 400);
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
            await api.delete(`/contacts/${id}`);
            setContacts(prev => prev.filter(c => c.id !== id));
        } catch (err) {
            console.error("Erro ao deletar", err);
        }
    }

    async function favoriteContact(id) {
        try {
            const contact = contacts.find(c => c.id === id);
            if (!contact) return;

            const newFavorite = typeof contact.favorite === "boolean" ? !contact.favorite : true;

            await api.patch(`/contacts/${id}`, { favorite: newFavorite });

            setContacts(prev =>
                prev.map(c => c.id === id ? { ...c, favorite: newFavorite } : c)
                    .sort((a, b) => (b.favorite === true) - (a.favorite === true))
            );
        } catch (err) {
            console.error("Erro ao favoritar", err);
        }
    }

    async function handleSave(contactData, id) {
        try {
            if (modalMode === "edit" && id) {
                await api.put(`/contacts/${id}`, contactData);

                setContacts(prev =>
                    prev.map(c => c.id === id ? { ...c, ...contactData } : c)
                );
            } else {
                const res = await api.post("/contacts", contactData);
                setContacts(prev => [...prev, res.data]);
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
    );
}
