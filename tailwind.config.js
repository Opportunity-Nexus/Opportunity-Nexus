/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,js}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Common/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        richblack: {
          5: "#F1F2FF",
          25: "#DBDDEA",
          100: "#AFB2BF",
          200: "#999DAA",
          700: "#2C333F",
          800: "#161D29",
          900: "#101828",
        },
        pink: {
          5: "#FFF1F1",
          25: "#FBC7D1",
          50: "#F79CB0",
          100: "#F37290",
          200: "#EF476F",
          300: "#D43D63",
          400: "#BA3356",
          500: "#9F294A",
          600: "#841E3E",
          700: "#691432",
          800: "#4F0A25",
          900: "#340019",
        },
        blue: {
          100: "#47A5C5",
        },
        midnightblue: "#191D2D",

        yellow: {
          50: "#FFD60A",
        },
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
  plugins: [require("@tailwindcss/forms")],
};
