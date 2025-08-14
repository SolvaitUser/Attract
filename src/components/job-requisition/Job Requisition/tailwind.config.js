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
        "wise-blue": "#0078FF",
        "wise-light-blue": "#EBF5FF",
        "wise-gray": "#F7F9FC",
        "wise-text": "#333333",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
