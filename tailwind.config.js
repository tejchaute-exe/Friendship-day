/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF9F4',
        'primary-yellow': '#FFD54A',
        'sky-blue': '#BEE8FF',
        lavender: '#DCCEFF',
        mint: '#D5F5E3',
        coral: '#FFB3A7',
        ink: '#2D2D2D',
      },
      fontFamily: {
        heading: ['Fredoka', 'system-ui', 'sans-serif'],
        body: ['Nunito', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      borderRadius: {
        card: '24px',
        btn: '18px',
      },
      boxShadow: {
        card: '0 10px 30px rgba(0,0,0,.08)',
        btn: '0 8px 16px rgba(255,213,74,.35)',
        glow: '0 0 24px rgba(255,213,74,.45)',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 0.3, transform: 'scale(0.85)' },
          '50%': { opacity: 1, transform: 'scale(1.1)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-14px) translateX(6px)' },
        },
      },
      animation: {
        twinkle: 'twinkle 3s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
