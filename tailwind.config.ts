import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
      },
      colors: {
        'nepal-blue': '#022E6C',
        'nepal-red': '#C51130'
      }
    },
  },
  plugins: [
  ],
};
export default config;