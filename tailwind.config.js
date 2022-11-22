const lineClamp = require("@tailwindcss/line-clamp");

module.exports = {
  content: ["./frontend/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [lineClamp],
};
