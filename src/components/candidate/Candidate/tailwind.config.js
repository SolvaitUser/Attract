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
        "wise-blue": {
          50: "#eaf5ff",
          100: "#d5ebff",
          200: "#b0d7ff",
          300: "#8bc3ff",
          400: "#66afff",
          500: "#3d90ff",
          600: "#0070ff",
          700: "#005ccc",
          800: "#004899",
          900: "#003366",
        }
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()]
}
