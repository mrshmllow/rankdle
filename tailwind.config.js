/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    keyframes: {
      streak: {
        "50%": {
          filter: "saturate(150%);",
        },
      },
    },
    animation: {
      streak: "streak 1s ease-in-out infinite",
    },
  },
  plugins: [
    require("@catppuccin/tailwindcss")({
      prefix: "ctp",
      // which flavour of colours to use by default, in the `:root`
      defaultFlavour: "mocha",
    }),
  ],
};
