/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./_layouts/**/*.html",
    "./_includes/**/*.html",
    "./pages/**/*.md",
    "./index.md"
  ],
  theme: {
    extend: {
      colors: {
        background: "#f9fafb",
        accentPink: "#e97991",
        accentPinkHover: "#d95f72",
        accentGreen: "#6b8f82",
        primaryText: "#1f2937",
        secondaryText: "#4b5563",
        callToAction: "#6b8f82",
        callToActionHover: "#527366",
        cardBorder: "#e5e7eb",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        display: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
