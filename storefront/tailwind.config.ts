import flowbite from "flowbite-react/tailwind";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fff7e6',
          100: '#ffebcc',
          200: '#ffd699',
          300: '#ffc266',
          400: '#ffad33',
          500: '#ff9900',
          600: '#e68900',
          700: '#b36b00',
          800: '#804c00',
          900: '#663d00',
        },
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
