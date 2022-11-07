const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api/publicApi", {
      target: "https://demoefaktura.mfin.gov.rs", // proxy for gov.rs
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/api/v1", {
      target: "https://api-gateway.mastersoftware.trampic.info/", // proxy for localhost
      changeOrigin: true,
    })
  );
};
