/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        genesis: {
          dark: '#0a0d14',
          card: '#111726',
          border: '#1f293d',
          accent: '#06b6d4',
          gold: '#f59e0b',
          glow: '#0891b2'
        }
      }
    },
  },
  plugins: [],
}

