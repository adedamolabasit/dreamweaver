/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "nebula-purple": "#4A1D96",
        "starry-blue": "#1E3A8A",
        "aurora-pink": "#DB2777",
        "ethereal-gold": "#F59E0B",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "serif"],
        hand: ["Caveat", "cursive"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 15px 2px rgba(147, 51, 234, 0.3)" },
          "50%": { boxShadow: "0 0 25px 5px rgba(219, 39, 119, 0.5)" },
        },
      },
      backdropFilter: {
        none: "none",
        blur: "blur(20px)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
