/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        cursive: ['"Dancing Script"', 'cursive'],
      },
      colors: {
        brand: {
          light: '#A7F3D0',
          DEFAULT: '#10B981',
          dark: '#047857',
        },
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '12px',
        lg: '20px',
        xl: '40px',
      },
      backgroundImage: {
        'gradient-rainbow': 'linear-gradient(270deg, #10B981, #6366F1, #EC4899)',
      },
      animation: {
        'gradient-flow': 'gradientFlow 6s ease infinite',
        'type': 'typing 2.5s steps(26) 1 forwards, blink 0.8s step-end 5',
        'pulse-text': 'subtlePulse 3s ease-in-out infinite',
      },
      keyframes: {
        gradientFlow: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
        typing: {
          '0%': { width: '0ch' },
          '100%': { width: '26ch' }, // Adjust this based on actual character length
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: '#4B5563' },
        },
        subtlePulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.85 },
        },
      },
    },
  },
  plugins: [],
};
