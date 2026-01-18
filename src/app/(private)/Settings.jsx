import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { FaArrowLeft } from "react-icons/fa";

export default function Settings() {
    const navigate = useNavigate();

    const { user, logout, deleteAccount } = useAuth();
    const { darkMode, toggleTheme, theme } = useTheme();

    return (
        <div style={{ ...styles.container, backgroundColor: theme.card, color: theme.text }}>

            <div style={{ ...styles.header }}>
                <button
                    style={{ ...styles.btnBack, color: theme.text }}
                    title="Voltar"
                    onClick={() => navigate("/tasks")}
                >
                    <FaArrowLeft />
                </button>
                <h2>Configurações</h2>
            </div>

            <hr />

            <div style={{ ...styles.card, backgroundColor: theme.card }}>
                <p style={{...styles.username}}>
                    <strong>Usuário:</strong> {user?.nome}
                    <br />
                    <strong>Email:</strong> {user?.email}
                </p>
            </div>

            <div style={{ ...styles.card, backgroundColor: theme.card }}>
                <button onClick={toggleTheme} style={styles.button}>
                    {darkMode ? "Tema Claro" : "Tema Escuro"}
                </button>
            </div>


            <div style={{ ...styles.card, backgroundColor: theme.card }}>
                <button
                    onClick={logout}
                    style={{ ...styles.button, backgroundColor: "#fa1d1d" }}
                >
                    Sair
                </button>

                <button
                    onClick={deleteAccount}
                    style={{ ...styles.button, backgroundColor: "#7f1d1d" }}
                >
                    Apagar Conta
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        border: 'solid 1px',
        padding: "20px 30px",
        maxWidth: "500px",
        borderRadius: "20px",
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
    },
    card: {
        padding: "5px",
        marginBottom: "1rem",
        borderRadius: "8px",
    },
    button: {
        width: "100%",
        padding: "10px 15px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "1rem",
        color: "#fff",
        backgroundColor: "#4f46e5",
    },
    username: {
        fontSize: '18px',
        textAlign: 'center',
    },
    btnBack: {
        background: 'transparent',
        border: 'none',
        fontSize: '18px',
    },
};