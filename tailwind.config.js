/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nexus: {
          bg: "#050505",
          text: "#e5e5e5",
          muted: "#a1a1a1",
          accent: "#00f0ff",
          accentAlt: "#7b61ff",
          pink: "#ff006e",
          green: "#00ff88",
          border: "#1a1a1a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        display: ["var(--font-space)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
