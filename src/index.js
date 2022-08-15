const http = require("http");

const port = 3000;

const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.end("<h1>Hello world</h1>");
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
