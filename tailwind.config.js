/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
],
  theme: {
    extend: {
      colors: {
        SkyBlue: "#ABDCFF",
        DarkTeal: "#156669",
        Teal: "#159DA2",
        LightTeal: "#ACE2E4",
        LightOrange: "#FFDAAE",
        LightBeige: "#F8F6F2",
      
      },
      fontFamily: {
        young: ["Young Serif", "serif"],
        atkinson: ["Atkinson Hyperlegible", "sans-serif"],
        opensans: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}

