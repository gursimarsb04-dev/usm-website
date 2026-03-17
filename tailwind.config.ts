import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0F1B2D",
          deep: "#0A1220",
        },
        saffron: {
          DEFAULT: "#D4912A",
          light: "#F0C96E",
        },
        cream: "#FDFAF5",
        "warm-white": "#FEFDFB",
        "slate-body": "#4A5568",
        "warm-gray": "#94A3B8",
        "off-white": "#E8E4DF",
      },
      fontFamily: {
        display: ["Clash Display", "sans-serif"],
        body: ["Satoshi", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      maxWidth: {
        container: "1400px",
      },
    },
  },
  plugins: [],
};

export default config;
