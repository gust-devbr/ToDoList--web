'use client'

import { FaCheck, FaReply, FaTrash, FaPencilAlt, TbPinnedOff, TbPinned } from '@/components/icons';
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { Button } from '../ui/button';
import { Field } from '../ui/field';

// const formatDate = (date) => new Date(date).toLocaleDateString("pt-BR");

export function TableItem({
    data,
    toggle,
    open,
    deleteItem
}) {

    const safeData = Array.isArray(data) ? data : [];

    const isNote = safeData.length > 0 && "pinned" in safeData[0];
    const isTask = safeData.length > 0 && "completed" in safeData[0];

    return (
        <Table>
            <TableBody>
                {safeData.map(u => (
                    <TableRow key={u.id}>
                        <TableCell className='flex w-full -ml-28 md:m-0'>
                            <p
                                className='flex w-full ml-28 md:m-0 text-lg md:text-2xl md:mt-5 font-bold'
                                style={{ textDecoration: u.completed ? 'line-through' : 'none' }}
                            >
                                {u.title}
                            </p>
                        </TableCell>
                        {isNote && (<TableCell>
                            <div className='wrap-break-word whitespace-normal text-[16px] md:text-lg -mt-1 md:mt-6'>
                                {u.content}
                            </div>
                        </TableCell>)}
                        <TableCell>
                            <div className='flex justify-end gap-4'>
                                <Button
                                    variant='ghost'
                                    className="text-primary w-1"
                                    onClick={() => open(u)}
                                >
                                    <FaPencilAlt className="h-6! w-6!" />
                                </Button>

                                {isTask && (<Button
                                    variant='ghost'
                                    className="text-primary w-1"
                                    onClick={() => toggle(u.id)}
                                >
                                    {u.completed ? <FaReply className="h-6! w-6!" /> : <FaCheck className="h-6! w-6!" />}
                                </Button>)}

                                {isNote && (<Button
                                    variant='ghost'
                                    className="text-primary w-1"
                                    onClick={() => toggle(u.id)}
                                >
                                    {u.pinned ? <TbPinnedOff className="h-7! w-7!" /> : <TbPinned className="h-7! w-7!" />}
                                </Button>)}

                                <Button
                                    variant='ghost'
                                    className="text-red-500 w-1"
                                    onClick={() => deleteItem(u.id)}
                                >
                                    <FaTrash className="h-6! w-6!" />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
};