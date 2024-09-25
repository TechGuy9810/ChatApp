/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'negative': '-340px',
        'positive': '340px'
    },
    },
  },
  plugins: [require("daisyui"),require('tailwind-scrollbar-hide')],
}
