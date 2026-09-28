/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#e50914',
          brightRed: '#ff0033',
          darkRed: '#b20710',
          black: '#0a0a0c',
          darkCharcoal: '#121216',
          cardBg: '#18181f',
          cardBorder: '#272732',
          lightGray: '#a1a1aa'
        }
      },
      fontFamily: {
        heading: ['Oswald', 'Bebas Neue', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      boxShadow: {
        'red-glow': '0 0 25px rgba(229, 9, 20, 0.4)',
        'red-glow-lg': '0 0 45px rgba(255, 0, 51, 0.5)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to right, rgba(10, 10, 12, 0.95) 30%, rgba(10, 10, 12, 0.6) 70%, rgba(10, 10, 12, 0.95) 100%)',
        'radial-red': 'radial-gradient(circle at center, rgba(229,9,20,0.15) 0%, transparent 70%)'
      }
    },
  },
  plugins: [],
}
