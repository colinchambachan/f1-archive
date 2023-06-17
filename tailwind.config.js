/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // that is animation class
      animation: {
        fade: "fadeIn 4s ease-in-out",
      },

      // that is actual animation
      keyframes: (theme) => ({
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
      }),
    },
  },
  plugins: [],
};
