const http = require("http");

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/") {
    console.log("Hello from Server");
    res.end();
  }
});

server.listen(3001, () => {
  console.log("server on http://localhost:3001");
});
