export function ValidateUsername(nome) {
    if (!nome) return "";
    const regex = /^[A-Z]/;
    if (!regex.test(nome)) return "O nome deve começar com letra maiúscula";
    return "";
};

export function ValidateEmail(email) {
    if (!email) return "";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return "Email inválido";
    return "";
};

export function ValidatePassword(senha) {
    if (senha.length > 0 && senha.length <= 6) return "Senha maior que 6 caracteres";
    return "";
};