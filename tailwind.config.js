/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}","./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        "color-primary": "#2D60FF",
        "color-text": "#202224",
        "color-white": "#FFFFFF",
        "color-alert": "#FC5C5C",
        "color-bag": "#F5F6FA",
        "color-green": "#3BB273",
        "color-blue": "#355AEE",
        "color-educanet": "#16348C",
        "color-gray": "#8280FF",
        "color-gray-1": "#DFEAF2"
      },
      fontSize: {
        "size-12": "12px",
        "size-14": "14px",
        "size-16": "16px",
        "size-18": "18px",
        "size-25": "25px",
        "size-28": "28px",
        "size-32": "32px",
        "size-64": "64px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
