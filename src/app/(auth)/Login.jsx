import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const res = await api.post('/auth/login', { email, senha });

            console.log(res.data)
            
            await login({
                token: res.data.token,
                user: { nome: res.data.nome, email: res.data.email }
            });

            navigate("/tasks");
        } catch (err) {
            alert(err.response?.data?.error || "Email ou senha inválidos")
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div style={{ ...styles.container }}>
                <h1>Login</h1>

                <input
                    style={{ ...styles.input }}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    style={{ ...styles.input }}
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

                <span style={{ ...styles.box }}>
                    <span>Não tem conta?</span>
                    <span style={{ ...styles.link }} onClick={() => navigate("/cadastro")}>Cadastre-se</span>
                </span>

                <button style={{ ...styles.button }}>Login</button>
            </div>
        </form>
    )
};

const styles = {
    container: {
        backgroundColor: '#F2F2F2',
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
};