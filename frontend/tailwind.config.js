/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#071952",
        "primary-variant" : "#3700B3",
        secondary: "#03DAC6",
        "secondary-variant":"#018786",
        background:  "#FFFFFF",
        error: "#B00020"
      },
      fontFamily: {
        primary: 'Poppins',
        secondary: 'Century Gothic',
        tertiary: 'Ubuntu',
        "primary-title" : "Bebas Neue"
      },
      boxShadow: {
        'custom': '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
      },
    },
  },
  plugins: [],
}

