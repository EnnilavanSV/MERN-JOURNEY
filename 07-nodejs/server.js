const http = require("http");

const products = [
  { id: 1, name: "React Dashboard", price: 49, category: "frontend" },
  { id: 2, name: "Node API Kit", price: 29, category: "backend" },
  { id: 3, name: "TypeScript Guide", price: 35, category: "fullstack" },
];

const server = http.createServer((req, res) => {
  const { url, method } = req;

  console.log(`[${new Date().toLocaleTimeString()}] ${method} ${url}`);

  // Set CORS headers — allows browser to access
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (url === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to DevMarket API");
  } else if (url === "/products" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } else if (url === "/health" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      }),
    );
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found", path: url }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`
🚀 DevMarket API running!
─────────────────────────────
http://localhost:${PORT}/           → Welcome message
http://localhost:${PORT}/products   → All products
http://localhost:${PORT}/health     → Server health
─────────────────────────────
Press Ctrl+C to stop
  `);
});
