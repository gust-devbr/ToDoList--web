import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
import "../styles/globals.css";

export const metadata = {
  title: "ToDoList",
  description: "Next App ToDoList",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
            {children}
            <Toaster richColors />
        </AuthProvider>
      </body>
    </html>
  )
};