import { redirect } from 'next/navigation';
import { ThemeProvider } from '@/context';
import PrivateStructure from './PrivateStructure';
import { getUserFromToken } from '@/lib/auth';

export default async function PrivateLayout({ children }) {
    const user = await getUserFromToken();
    if (!user) redirect("/");

    return (
        <ThemeProvider>
            <PrivateStructure>
                {children}
            </PrivateStructure>
        </ThemeProvider>
    )
};