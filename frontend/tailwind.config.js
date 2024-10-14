/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      height: {
        header: "10vh", // custom height for header
        hero: "90vh",
      },
      colors: {
        primary: "#0C66E4", // --e-global-color-primary
        secondary: "#0C66E4", // --e-global-color-secondary
        text: "#172B4D", // --e-global-color-text
        accent: "#1B1AFF", // --e-global-color-accent
        light: "#E9F2FF61", // --e-global-color-light
        background: "#F5F8FE", // --e-global-color-d54a1ce
      },
    },
  },
  plugins: [],
};
