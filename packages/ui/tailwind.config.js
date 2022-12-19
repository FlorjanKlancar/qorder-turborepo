/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        default: "#17AEB6",
        defaultLight: "#1ce0eb",
        defaultDark: "#118b91",
        darkThemeBackground: "#202225",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
  daisyui: {
    themes: false,
  },
};
