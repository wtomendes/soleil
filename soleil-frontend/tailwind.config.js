/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'soleil-brown': '#7A4E2D',
        'soleil-dark': '#3C2A1E',
        'soleil-light': '#F7E9DD',
        'soleil-beige': '#EAD8C5',
        'soleil-cream': '#FFF8F1',
        'soleil-accent': '#F3C766',
        'soleil-medium': '#7B6A5A',
        'soleil-header': '#724943',
        'soleil-cta': '#D07C3E',
        'soleil-cta-dark': '#B9652C',
      },
    }
  },
  plugins: []
};