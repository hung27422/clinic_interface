/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        barlow: ['"Barlow Condensed"', "sans-serif"],
      },
      colors: {
        background: "#8ad5eb",
        page: "#f5f5f5",
        primary: "#1b9fc9",
      },
    },
    screens: {
      "ipad-air5": "1640px",
    },
  },
  plugins: [],
};
