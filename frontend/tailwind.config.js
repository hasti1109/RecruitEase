/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#f06449",
        "primary-variant" : "#2a8f68",
        secondary: "#5aaf76",
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

