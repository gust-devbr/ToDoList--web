import { ThemeProvider } from '@/context';
import PrivateStructure from './PrivateStructure';

export default function PrivateLayout({ children }) {
    return (
        <ThemeProvider>
            <PrivateStructure>
                {children}
            </PrivateStructure>
        </ThemeProvider>
    )
};