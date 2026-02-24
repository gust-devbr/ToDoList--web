'use client'

import { FaCheck, FaReply, FaTrash, FaPencilAlt } from '@/components/icons';
import { Table, Button } from "@/components";
import { useTheme } from '@/context';

const formatDate = (date) => new Date(date).toLocaleDateString("pt-BR");

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
        <div>
            <Table>
                <Table.Body>
                    {safeData.map(u => (
                        <Table.Row key={u.id}>
                            <Table.Cell className="max-w-50">
                                <div className="flex flex-col text-xs md:text-sm">
                                    Criada<strong>{formatDate(u.createdAt)}</strong>
                                    Atualizada<strong>{formatDate(u.updatedAt)}</strong>
                                </div>
                            </Table.Cell>
                            <Table.Cell className='flex w-full -ml-28 md:m-0'>
                                <div className='flex w-full ml-28 md:m-0 md:text-xl mt-3 md:mt-5' style={{ textDecoration: u.completed ? 'line-through' : 'none' }}>
                                    {u.title}
                                </div>
                            </Table.Cell>
                            {isNote && (
                                <Table.Cell className='md:table-cell'>
                                    <div className='wrap-break-word whitespace-normal text-sm md:text-lg -mt-3'>
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
                                        onClick={() => deleteItem(u.id)}
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