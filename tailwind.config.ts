import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        stay: {
          bg: "#0d0d0d",
          text: "#bfbfbf",
          accent: "#888888"
        },
        candle: "#f9d9a9",
        dusk: "#1b1a1e",
        "soft-green": "#8aa6a3"
      },
      boxShadow: {
        lullaby: "0 20px 60px rgba(0,0,0,0.35)"
      },
      animation: {
        "slow-fade": "slowFade 1.4s ease both"
      },
      keyframes: {
        slowFade: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
