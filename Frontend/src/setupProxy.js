// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000', // Your backend server
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api/v1', // Rewrite path if needed
      },
    })
  );
};