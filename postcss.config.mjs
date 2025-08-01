/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // This object syntax is the standard and most reliable way
    '@tailwindcss/postcss': {},
    'autoprefixer': {},
  },
};

export default config;