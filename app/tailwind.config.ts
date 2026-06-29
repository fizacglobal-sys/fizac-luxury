import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                // Overrides the standard 'font-sans' fallback utility with your geometric luxury font
                sans: ["var(--font-luxury)", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;
