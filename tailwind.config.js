/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#d32f2f',
        secondary: '#ffffff',
        dark: '#333333',
      },
    },
  },
  plugins: [],
};
