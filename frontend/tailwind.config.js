/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F7F4F3',
        peach: '#F6A57A',
        sky: '#DCEFFD',
        blush: '#FCE7E1',
        ink: '#1F1F1F',
      },
      fontFamily: {
        display: ['"Poppins"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 80px rgba(31, 31, 31, 0.08)',
        card: '0 20px 45px rgba(31, 31, 31, 0.08)',
      },
    },
  },
  plugins: [],
}
