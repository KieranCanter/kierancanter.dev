/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        plush: {
          bg: "rgba(185, 172, 174, 1)",
          fgSoft: "rgba(43, 36, 37, 0.6)",
          fgHard: "rgba(43, 36, 37, 0.87)",
          fgContrast: "rgba(90, 0, 0, 0.87)",
        },
        sombre: {
          bg: "rgba(43, 36, 37, 1)",
          fgSoft: "rgba(185, 172, 174, 0.6)",
          fgHard: "rgba(185, 172, 174, 0.87)",
          fgContrast: "rgba(255, 227, 181, 0.87)",
        },
        brilliant: {
          bg: "rgba(229, 229, 229, 1)",
          fgSoft: "rgba(18, 18, 18, 0.6)",
          fgHard: "rgba(18, 18, 18, 0.87)",
          fgContrast: "rgba(233, 223, 98, 0.87)",
        },
        luminous: {
          bg: "rgba(18, 18, 18, 1)",
          fgSoft: "rgba(229, 229, 229, 0.6)",
          fgHard: "rgba(229, 229, 229, 0.87)",
          fgContrast: "rgba(72, 168, 228, 0.87)",
        }
      }
    },
  },
  plugins: [],
}

