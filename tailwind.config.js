module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Archivos en la carpeta app
    './components/**/*.{js,ts,jsx,tsx}', // Si tienes componentes en otra carpeta
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1d4ed8', // Un azul personalizado
      },
    },
  },  
  plugins: [],
};