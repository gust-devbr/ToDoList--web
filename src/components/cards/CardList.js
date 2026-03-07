'use client'

import { FaTrash, FaPencilAlt } from '@/components/icons';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';

const formatDate = (date) => new Date(date).toLocaleDateString("pt-BR");

const styles = {
    container: "hover:shadow-md transition",
    childrenContent: "text-[18px] space-y-2",
    icon: "mr-1 h-5! w-5!",
    header: "flex flex-row text-left text-2xl items-center",
    dateContent: "flex flex-row justify-between items-center gap-2 text-[13px] text-muted-foreground",
    dateText: "text-bold text-foreground text-[14px]",
    footer: "flex-1 justify-between gap-2 flex-wrap"
};

export function CardList({
    children,
    title,
    onDelete,
    onUpdate,
    onRename,
    createdAt,
    updatedAt,
    MarkIcon,
    MarkText,
}) {
    return (
        <Card className={styles.container}>
            <CardHeader className={styles.header}>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            {children && (
                <>
                    <Separator />
                    <CardContent className={styles.childrenContent}>
                        {children}
                    </CardContent>
                </>
            )}
            <Separator />
            <CardContent>
                <p className={styles.dateContent}>
                    <span> Criado em: <span className={styles.dateText}>{formatDate(createdAt)}</span> </span>
                    <span> Atualizado em: <span className={styles.dateText}>{formatDate(updatedAt)}</span> </span>
                </p>
            </CardContent>
            <Separator />
            <CardFooter className={styles.footer}>
                <Button variant='outline' onClick={onRename}>
                    <FaPencilAlt className={styles.icon} />
                    Editar
                </Button>

                <Button variant='destructive' onClick={onDelete}>
                    <FaTrash className={styles.icon} />
                    Excluir
                </Button>

                <Button onClick={onUpdate}>
                    {MarkIcon && <MarkIcon className={styles.icon} />}
                    {MarkText}
                </Button>
            </CardFooter>
        </Card>
    )
};