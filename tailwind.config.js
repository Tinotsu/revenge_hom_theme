/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layout/**/*.liquid',
    './templates/**/*.liquid',
    './sections/**/*.liquid',
    './snippets/**/*.liquid',
    './assets/**/*.liquid',
  ],
  
  theme: {
    extend: {
      colors: {
        revenge1: '#F68532',
        revenge2: '#4B3E37',
        revenge3: '#BFAB99',
        revenge4: '#DFD5CC',
      }
    },
  },
  plugins: [],
}

