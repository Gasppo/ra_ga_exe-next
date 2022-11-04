/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'split-white-black': "linear-gradient(to bottom, #111827 0% , #e5e5e5 0%);"
      }
    },
  },
  plugins: [],
};
