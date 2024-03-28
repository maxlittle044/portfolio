/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],

  theme: {
    container: {
      center: true,
    },

    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        DM_Sans: ['DM Sans', 'sans-serif']
      },

      screens: {
        'sm': '576px',
        'lg': '992px',
        'xl': '1140px',
        '2xl': '1310px',
      },
      colors: {
        'dark-blue-100': '#44566c',
      }
    },
  },
  plugins: [],
}
