import type { Config } from "tailwindcss"

const config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Ubuntu', 'sans-serif'],
      heading: ['"Bitcount Single"', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
