/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,js}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Common/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
        blue: {
          100: "#47A5C5",
        },
        midnightblue: "#191D2D",
        pink: {
          200: "#EF476F",
        },
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
  plugins: [require('@tailwindcss/forms'),],
};
