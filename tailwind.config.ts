import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        banner: "url('/background.png')",
      },

      fontFamily: {
        work: ['Work Sans', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        sans: ['ui-sans-serif', 'system-ui'],
        serif: ['ui-serif', 'Georgia'],
        inter: ['Inter', 'sans-serif'],
        lexend: ['Lexend Deca', 'sans-serf'],
        Azeret: ['Azeret Mono', 'Monospace'],
      },
    },
  },
  plugins: [],
}
export default config
