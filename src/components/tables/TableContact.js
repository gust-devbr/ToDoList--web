'use client'

import { FaPencilAlt, FaTrash, FaStar, FaRegStar } from "@/components/icons";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { Field, FieldGroup } from "../ui/field";

export function TableContact({
    data,
    open,
    toggle,
    onDelete
}) {
    const safeData = Array.isArray(data) ? data : [];

    return (
        <Table>
            <TableBody>
                {safeData.map(u => (
                    <TableRow key={u.id}>
                        <TableCell>
                            <FieldGroup className="flex flex-col gap-1 mt-2">
                                <Field className="text-2xl font-semibold">
                                    {u.name}
                                </Field>
                                <Field className="flex flex-col gap-1 text-[16px] md:text-[18px] md:flex-row md:gap-10 md:items-center">
                                    <span>{u.email}</span>
                                    <span>{u.tel}</span>
                                    <span>{u.category}</span>
                                </Field>
                            </FieldGroup>
                        </TableCell>
                        <TableCell>
                            <div className='flex justify-end gap-2'>
                                <Button
                                    variant="ghost"
                                    className="text-white w-1"
                                    onClick={() => open(u)}
                                >
                                    <FaPencilAlt className="h-6! w-6!" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="text-yellow-500 w-1"
                                    onClick={() => toggle(u.id)}
                                >
                                    {u.favorite ? <FaStar className="h-7! w-7!" /> : <FaRegStar className="h-7! w-7!" />}
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="text-red-500 w-1"
                                    onClick={() => onDelete(u.id)}
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