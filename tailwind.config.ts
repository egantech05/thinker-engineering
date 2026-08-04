import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                ink: "#0A0612",
                panel: "#150F24",
                gold: {
                    DEFAULT: "#A855F7",
                    light: "#D8B4FE",
                },
                blue: {
                    DEFAULT: "#7C3AED",
                    dark: "#2E1065",
                },
                mist: "#9CA3AF",
            },
            fontFamily: {
                sans: ["var(--font-sans)", "system-ui", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;