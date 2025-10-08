/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./_layouts/**/*.html', './_includes/**/*.html', './neurodiversity-coaching-and-technology-mentoring/**/*.md', './index.md'],
  theme: {
    extend: {
      colors: {
        background: '#f9fafb',
        accentPink: '#e97991',
        accentPinkHover: '#d95f72',
        accentGreen: '#6b8f82',
        primaryText: '#1f2937',
        secondaryText: '#181717',
        callToAction: '#6b8f82',
        callToActionHover: '#527366',
        cardBorder: '#e5e7eb',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
