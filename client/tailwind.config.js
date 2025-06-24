/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
        },
        secondary: {
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
      animation: {
        'bounce-slow': 'bounce 3s linear infinite',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
} 