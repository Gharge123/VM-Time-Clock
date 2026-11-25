/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { vmgold: "#ffc629", ink: "#080808", canvas: "#f4f7f9" },
      boxShadow: { soft: "0 2px 12px rgba(0,0,0,.06)" },
    },
  },
  plugins: [],
};
