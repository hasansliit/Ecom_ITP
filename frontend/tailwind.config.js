module.exports = {
  content: [
    './src/Components/Product_Man/*.{js,jsx,ts,tsx}',  // Adjust this based on your project structure
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          light: '#3B82F6',
          DEFAULT: '#1E3A8A',
        },
        darkBlue: '#1E40AF',
      },
    },
  },
  plugins: [],
}