/** @type {import('tailwindcss').Config} */
// AISA brand preset is the source of truth for colours/fonts/scale.
const aisa = require('./tailwind.brand.js')

module.exports = {
  presets: [aisa],
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
}
