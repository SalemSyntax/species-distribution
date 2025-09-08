/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",             // root html
    "./src/**/*.{js,ts,jsx,tsx}" // all source files
  ],
  theme: {
    extend: {
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        '1000': '1000',
        '2000': '2000',
      },
    },
  },
  plugins: [],
};
