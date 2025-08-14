import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wise: {
          blue: '#0070F3',
          lightBlue: '#E5F1FF',
          sidebar: '#F4F7FC',
          text: '#111827',
          lightGray: '#F9FAFB',
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
