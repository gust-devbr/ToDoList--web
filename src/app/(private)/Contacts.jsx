/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { TableContacts } from "@/components/TableContact";
import { ContactModal } from "@/components/ContactModal";
import { useTheme } from "@/context/ThemeContext";
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

    async function handleSave(contactData, id) {
        try {
            if (modalMode === "edit" && id) {
                await api.put(`/contacts/${id}`, contactData);

                setContacts(prev =>
                    prev.map(c =>
                        c.id === id
                            ? { ...c, ...contactData } // mantém o id
                            : c
                    )
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
                <TableContacts
                    data={contacts}
                    open={openEditModal}
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
