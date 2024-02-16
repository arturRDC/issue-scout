/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  darkMode: ['class', '[data-theme="darktheme"]'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        lighttheme: {
          primary: '#244bfe',
          secondary: '#eef1ff',
          accent: '#c7e583',
          neutral: '#F8FBFE',
          'base-100': '#FFFFFF',
        },
      },
      {
        darktheme: {
          primary: '#0129DA',
          secondary: '#00030F',
          accent: '#5D7A1A',
          neutral: '#010509',
          'base-100': '#010509',
        },
      },
      'dark',
      'light',
      'forest',
      'retro',
    ],
  },
};
