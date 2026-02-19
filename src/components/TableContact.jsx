import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { Table } from "./ui/table";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "./ui/button";

export function TableContacts({
    data,
    open,
    onDelete
}) {
    const { theme } = useTheme();
    const safeData = Array.isArray(data) ? data : [];

    return (
        <Table>
            <Table.Body>
                {safeData.map(u => (
                    <Table.Row key={u.id ?? `contact-${u.email}`}>
                        <>
                            <Table.Cell>

                                <div className="flex flex-col gap-1 text">
                                    <div className="text-2xl font-semibold">
                                        {u.name}
                                    </div>

                                    <div className="flex flex-col gap-1 md:flex-row md:gap-10 md:items-center">
                                        <span>{u.email}</span>
                                        <span>{u.tel}</span>
                                        <span>{u.category}</span>
                                    </div>
                                </div>

                            </Table.Cell>

                            <Table.Cell>
                                <div className='flex justify-end gap-2'>
                                    <Button
                                        style={{ color: theme.text }}
                                        title='Editar'
                                        onClick={() => open(u)}
                                        icon={FaPencilAlt}
                                    />

                                    <Button
                                        style={{ color: theme.icon }}
                                        title='Excluir'
                                        onClick={() => onDelete(u.id)}
                                        icon={FaTrash}
                                    />
                                </div>
                            </Table.Cell>
                        </>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
};