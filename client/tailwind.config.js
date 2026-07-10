/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefcf5",
          100: "#d5f5e3",
          200: "#aeebca",
          300: "#78d9ab",
          400: "#43c088",
          500: "#22a56d",
          600: "#158457",
          700: "#126a48",
          800: "#12543b",
          900: "#0f4633",
          950: "#06271c",
        },
        ink: {
          900: "#0b1120",
          800: "#131c31",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
