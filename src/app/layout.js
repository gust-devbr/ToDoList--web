import { AuthProvider, ThemeProvider } from "@/context";
import "../styles/globals.css";

export const metadata = {
  title: "ToDoList",
  description: "Next App ToDoList",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
};