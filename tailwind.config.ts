import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                ink: "#050505",
                panel: "#0b0d10",
                gold: {
                    DEFAULT: "#FFCB05",
                    light: "#FFD633",
                },
                blue: {
                    DEFAULT: "#2B6CB8",
                    dark: "#0F2A45",
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