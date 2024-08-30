/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        sidebarSlideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        sidebarSlideOut: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        sidebarSlideIn: "sidebarSlideIn 0.4s ease-in-out forwards",
        sidebarSlideOut: "sidebarSlideOut 0.4s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
