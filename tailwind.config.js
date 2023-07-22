/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      reaver: ["Reaver", "serif"],
      radiance: ["Radiance", '"Noto Sans"', '"sans-serif"']
    },
    screens: {
      "sm": "320px",
      "md": "640px",
      "lg": "768px",
      "2lg": "1024px",
      "xl": "1280px",
      "2xl": "1536px"
    },
    extend: {},
  },
  plugins: [],
}
