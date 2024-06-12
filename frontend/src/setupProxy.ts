/* import { RequestHandler, createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app: {
  use: (arg0: string, arg1: RequestHandler) => void;
}) {
  // Proxy for API 1
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );

  // Proxy for API 2
  app.use(
    "/api/upload",
    createProxyMiddleware({
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );
};
 */
