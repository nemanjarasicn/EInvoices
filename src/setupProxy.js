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
      target: "https://api.dev.mastersoftware.rs/", // proxy for localhost  api.dev.mastersoftware.rs  https://api-gateway.mastersoftware.trampic.info/
      changeOrigin: true,
    })
  );
};
