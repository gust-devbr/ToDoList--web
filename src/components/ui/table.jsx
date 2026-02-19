import { cn } from "@/lib/utils"

function TableRoot({ children, className = "" }) {
    return (
        <div className={cn("relative w-full max-h-100 overflow-y-auto")}>
            <table className={cn(`w-full text-sm table-fixed text-left ${className}`)}>
                {children}
            </table>
        </div>
    )
};

function Header({ children }) {
    return <thead className={cn("border-b")}>{children}</thead>
};

function Body({ children }) {
    return <tbody>{children}</tbody>
};

function Row({ children }) {
    return (
        <tr className={cn("border-b text-lg transition-colors")}>
            {children}
        </tr>
    )
};

function Head({ children, className = "" }) {
    return (
        <th className={cn(`px-6 py-3 text-left align-middle font-medium text-md text-gray-500 ${className}`)}>
            {children}
        </th>
    )
};

function Cell({ children, className = "" }) {
    return (
        <td className={cn(`px-6 py-4 text-left text-lg align-middle ${className}`)}>
            {children}
        </td>
    )
};

const Table = Object.assign(TableRoot, {
    Header,
    Body,
    Row,
    Head,
    Cell
});

export default Table;