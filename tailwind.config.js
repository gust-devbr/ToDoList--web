const config = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("tailwindcss-animate")],
}

export default config;