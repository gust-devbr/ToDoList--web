import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../services/api';
import { useTheme } from '../../context/ThemeContext';

export default function Cadastro() {
    const { theme } = useTheme();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    async function handleCadastro(e) {
        e.preventDefault();

        await api.post("/auth/register", { nome, email, senha });
        navigate("/login");
    };

    return (
        <form onSubmit={handleCadastro}>
            <div style={{ ...styles.container, backgroundColor: theme.card }}>
                <h1>Cadastro</h1>

                <input
                    style={{ ...styles.input, color: theme.text }}
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <input
                    style={{ ...styles.input, color: theme.text }}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    style={{ ...styles.input, color: theme.text }}
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

                <span style={{ ...styles.box, backgroundColor: theme.card }}>
                    <span>Já tem conta?</span>
                    <span style={{ ...styles.link }} onClick={() => navigate("/login")}>Login</span>
                </span>

                <button style={{ ...styles.button }}>Cadastro</button>
            </div>

            <p style={{...styles.aviso, color: theme.icon}}>*Não utilize dados reais</p>
        </form>
    )
};

const styles = {
    container: {
        border: 'none',
        borderRadius: '20px',
        padding: '15px',
        boxShadow: '2px 2px 15px',
        maxWidth: '500px',
        minWidth: '300px',
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        border: 'solid 1px',
        borderRadius: '5px',
        marginTop: '2px',
        marginBottom: '2px',
        padding: '10px 15px',
        fontSize: '15px',
    },
    button: {
        border: 'solid 1px',
        borderRadius: '5px',
        backgroundColor: 'green',
        color: '#FFF',
        width: '100%',
        padding: '7px 10px',
        fontSize: '18px',
    },
    box: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '10px',
        marginBottom: '10px',
        fontSize: '17px',
        padding: '5px 8px',
        borderRadius: '10px',
    },
    link: {
        color: 'blue',
        textDecoration: 'underline',
    },
    aviso: {
        textAlign: 'center',
        fontSize: '17px',
    },
};