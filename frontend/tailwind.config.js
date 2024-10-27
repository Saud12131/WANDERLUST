/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',                   // Ensure this is included
    './src/**/*.{js,jsx,ts,tsx}',     // This should cover all JS/TS files in src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};