/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        safe: {
          bg: "#000000",
          surface: "#1E293B",
          border: "#455269",
          accent: "#6366F1",
          warning: "#FFE100",
          kakao: "#FEE500"
        }
      }
    }
  },
  plugins: []
};
