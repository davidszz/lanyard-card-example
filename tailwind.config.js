module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        online: '#3ba55d',
        idle: '#faa81a',
        dnd: '#ed4245',
        offline: '#747f8d'
      }
    },
  },
  plugins: [],
}
