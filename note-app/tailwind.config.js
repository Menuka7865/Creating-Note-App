/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      //project colors
      colors:{
        primary:"#2B85FF",
        secondary:"#EF863E"
      }, 
    },
  },
  plugins: [],
}