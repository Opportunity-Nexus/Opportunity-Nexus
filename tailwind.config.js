/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,js}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5fbff",
          100: "#e8f5ff",
          200: "#c7ef44",
          300: "#a6ceff",
          400: "#6094fc",
          500: "#1e4ffd",
          600: "#1e4ffd",
          700: "#1130bd",
          800: "#0b2296",
          900: "#061673",
        },
      },
    },
  },
  plugins: [],
};
