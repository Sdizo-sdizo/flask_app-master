/** @type {import('tailwindcss').Config} */
<<<<<<< HEAD
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
=======
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
>>>>>>> 2ea9360 (Complete rewrite with new UI and social login components)
  ],
  theme: {
    extend: {
      animation: {
        'growTrunk': 'growTrunk 2s ease-out forwards',
        'growBranch': 'growBranch 1.5s ease-out 2s forwards',
        'growBranch2': 'growBranch2 1.5s ease-out 3.5s forwards',
        'growLeaves': 'growLeaves 2s ease-out 5s forwards',
        'fadeIn': 'fadeIn 1s ease-out forwards',
        'moneyFall': 'moneyFall 2s ease-out forwards',
        'fallingMoney': 'fallingMoney 2s ease-out forwards',
        'fallingCoin': 'fallingCoin 2s ease-out forwards',
        'float': 'float 10s ease-in-out infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'fill': 'fill 2s ease-in-out infinite',
<<<<<<< HEAD
        'fade-in': 'fadeIn 0.5s ease-in',
=======
        'fade-in': 'fadeIn 0.5s ease-out',
>>>>>>> 2ea9360 (Complete rewrite with new UI and social login components)
        'fade-in-delay': 'fadeIn 0.5s ease-out 0.2s',
        'slide-in': 'slideIn 0.5s ease-out',
        'shake': 'shake 0.5s ease-in-out',
        'slide-out': 'slideOut 0.5s ease-in',
<<<<<<< HEAD
        'slide-up': 'slideUp 0.5s ease-out',
=======
>>>>>>> 2ea9360 (Complete rewrite with new UI and social login components)
      },
      keyframes: {
        growTrunk: {
          '0%': { 'stroke-dasharray': '0 200', 'stroke-dashoffset': '0' },
          '100%': { 'stroke-dasharray': '200 0', 'stroke-dashoffset': '0' }
        },
        growBranch: {
          '0%': { 'stroke-dasharray': '0 100', 'stroke-dashoffset': '0' },
          '100%': { 'stroke-dasharray': '100 0', 'stroke-dashoffset': '0' }
        },
        growBranch2: {
          '0%': { 'stroke-dasharray': '0 80', 'stroke-dashoffset': '0' },
          '100%': { 'stroke-dasharray': '80 0', 'stroke-dashoffset': '0' }
        },
        growLeaves: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        moneyFall: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        fallingMoney: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        fallingCoin: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' },
        },
        fill: {
          '0%': { height: '0%' },
          '50%': { height: '100%' },
          '100%': { height: '0%' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
<<<<<<< HEAD
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
=======
>>>>>>> 2ea9360 (Complete rewrite with new UI and social login components)
      },
      colors: {
        'google-red': '#DB4437',
        'microsoft-blue': '#00A4EF',
        'apple-black': '#000000',
<<<<<<< HEAD
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
=======
>>>>>>> 2ea9360 (Complete rewrite with new UI and social login components)
      },
    },
  },
  plugins: [],
} 