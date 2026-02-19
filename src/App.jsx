import { BrowserRouter } from "react-router-dom";
import { AuthProvider, ThemeProvider } from './context';
import AppRoutes from './routes/AppRoutes';

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ThemeProvider>
                    <AppRoutes />
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
    )
};