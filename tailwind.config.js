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
        'attract-blue': '#0078ff',
        'attract-light-blue': '#e6f2ff',
        'attract-sidebar': '#f5f8fb',
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()]
};