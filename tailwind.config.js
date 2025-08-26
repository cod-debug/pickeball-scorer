/** @type {import('tailwindcss').Config} */
import tailwindRtl from 'tailwindcss-rtl';
import flowbitePlugin from 'flowbite/plugin'
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#FFF',
        primary: '#183444',
        accent: '#E03D22',
        grey:'#D9D9D9',
        blue: "#121063",
      },
    },
  },
  safelist: [
    'border-cyan-600',
    'border-yellow-300',
    'border-yellow-400',
    'border-red-600',
    'border-red-500'
  ],
  plugins: [
    tailwindRtl,
    flowbitePlugin
  ],
  darkMode: 'class',
}

