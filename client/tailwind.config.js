/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#7C3AED',
          DEFAULT: '#6D28D9',
          dark: '#5B21B6',
        },
        secondary: {
          light: '#1E40AF',
          DEFAULT: '#1E3A8A',
          dark: '#172554',
        },
        accent: {
          light: '#10B981',
          DEFAULT: '#059669',
          dark: '#047857',
        },
        dark: {
          bg: '#0F172A',
          card: '#1E293B',
          border: '#334155',
        },
        light: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-aura': 'linear-gradient(135deg, #6D28D9 0%, #1E3A8A 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      }
    },
  },
  plugins: [],
}
