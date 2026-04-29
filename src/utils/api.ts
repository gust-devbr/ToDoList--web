export async function apiFetch(url: string, options: RequestInit = {}) {
    const res = await fetch(`/api/${url}`, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        ...options
    })

    const data = await res.json()

    return {
        ok: res.ok,
        ...data
    }

};