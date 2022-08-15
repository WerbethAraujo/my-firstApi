const http = require("http");
const routes = require("./routes");

const port = 3000;

const server = http.createServer((request, response) => {
  console.log(`Request method: ${request.method} | Endpoint: ${request.url}`);

  const route = routes.find(
    (objRoutes) =>
      objRoutes.endpoint === request.url && objRoutes.method === request.method
  );

  if (route) {
    route.handler(request, response);
  } else {
    response.writeHead(404, { "Content-type": "text/html" });
    response.end(`Cannot ${request.method} ${request.url}`);
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
