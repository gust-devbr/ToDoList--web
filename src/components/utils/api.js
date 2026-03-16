export async function api(url, options = {}) {
    const res = await fetch(`/api/${url}`, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        ...options
    });

    if (!res.ok) throw new Error("Erro na requisição");

    return res.json();
};