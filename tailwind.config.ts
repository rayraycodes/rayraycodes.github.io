import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '7.5xl': '80rem', // This is between 7xl (80rem) and 8xl (96rem)
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      animation: {
        'color-change': 'color-change .5s infinite',
        'fade-in': 'fade-in .2s ease-out',
        'slide-fade-in': 'slide-fade-in .5s ease-in-out',
        'animate-shake-heavy': 'shake .5s ease-in-out',
        'fly-in': 'fly-in 0.8s ease-out',
        'fade-in-long': 'fade-in 1s ease-in',
        'slide-in-right': 'slide-in-right 1s ease-out',
      },
      colors: {
        'nepal-blue': '#022E6C',
        'nepal-red': '#C51130',
        'nepal-blue-600': 'rgba(0, 123, 255, 0.6)', // Replace with the RGB values of your color
        'nepal-blue-900': 'rgba(0, 123, 255, 0.9)', // Replace with the RGB values of your color
        'leaves-green': '#004225',
        'jungle-green': '#29AB87',
      },
      keyframes: {
        'fly-in': {
          '0%': { transform: 'translateY(-50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(10%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
  ],
};
export default config;