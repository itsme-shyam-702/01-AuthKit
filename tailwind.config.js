/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}','./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: { colors: { primary: '#5B3FE4', 'primary-dark': '#4930C2', 'primary-light': '#EEF0FF' } } },
  plugins: [],
}
