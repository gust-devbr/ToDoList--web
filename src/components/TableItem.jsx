import { FaCheck, FaReply, FaTrash, FaPencilAlt } from 'react-icons/fa';
import { Button } from "./ui/button";
import { useTheme } from '@/context/ThemeContext';
import { Table } from "./ui/table";

function formatDate(date) {
    return new Date(date).toLocaleDateString("pt-BR");
};

export function TableItem({
    data,
    toggle,
    open,
    deleteItem
}) {

    const safeData = Array.isArray(data) ? data : [];
    const { theme } = useTheme();

    const isNote = safeData.length > 0 && "content" in safeData[0];
    const isTask = safeData.length > 0 && "completed" in safeData[0];

    return (
        <div className="border-2">
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.Head className='md:w-60 w-40'>Info</Table.Head>
                        <Table.Head>Título</Table.Head>
                        {isNote && <Table.Head className='md:table-cell'>Conteúdo</Table.Head>}
                        <Table.Head className='text-right'>Ações</Table.Head>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {safeData.map(u => (
                        <Table.Row key={u.id}>
                            <Table.Cell className="max-w-50">
                                <div className="flex flex-col text-xs md:text-sm">
                                    Criada<strong>{formatDate(u.created_at)}</strong>
                                    Atualizada<strong>{formatDate(u.updated_at)}</strong>
                                </div>
                            </Table.Cell>
                            <Table.Cell className='flex w-full -ml-28 md:m-0'>
                                <div className='flex w-full ml-28 md:m-0' style={{ textDecoration: u.completed ? 'line-through' : 'none' }}>
                                    {u.title}
                                </div>
                            </Table.Cell>
                            {isNote && (
                                <Table.Cell className='md:table-cell'>
                                    <div className='wrap-break-word whitespace-normal text-sm'>
                                        {u.content}
                                    </div>
                                    </Table.Cell>
                            )}
                            <Table.Cell>
                                <div className='flex justify-end gap-2'>
                                    <Button
                                        style={{ color: theme.text }}
                                        title='Editar'
                                        onClick={() => open(u)}
                                        icon={FaPencilAlt}
                                    />

                                    {isTask && (<Button
                                        style={{ color: theme.checkIcon }}
                                        title={u.completed ? 'Desmarcar' : 'Concluída'}
                                        onClick={() => toggle(u.id)}
                                        icon={u.completed ? FaReply : FaCheck}
                                    />)}

                                    <Button
                                        style={{ color: theme.icon }}
                                        title='Excluir'
                                        onClick={() => deleteItem (u.id)}
                                        icon={FaTrash}
                                    />
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
};