/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/frontend/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-blue": "#0671b4",
        "blue-lightest": "#E9F1FF",
        "blue-light": "#9AC6FE",
        "blue-medium": "#0C9AF3",
        "blue-dark": "#023F68",
        "blue-darkest": "#001223",
      },
    },
  },
  plugins: [],
};
