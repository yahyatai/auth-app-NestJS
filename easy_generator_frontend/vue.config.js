// vue.config.js

const path = require('path');

module.exports = {
  // Disable linting on save to avoid ESLint errors during development
  lintOnSave: false,

  // Set the output directory for the built project
  outputDir: path.resolve(__dirname, 'dist'),

  // Set public path depending on environment
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

  // Enable source maps in production if needed
  productionSourceMap: false,

  // Dev server configuration
  devServer: {
    port: 8081, // Change this to whatever port your Vue app should run on
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Proxy your NestJS backend
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },

  // Webpack configuration (optional customization)
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
};
