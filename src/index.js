//imports do nativos do node
const http = require("http");
const { URL } = require("url");

//imports de outros arquivos
const routes = require("./routes");
const bodyParser = require("./helpers/bodyParser");
const port = 3000;

//crinando um servidor http com o método create server
const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:3000${request.url}`);
  console.log(
    `Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`
  );

  //split na url para pegar os query params
  let { pathname } = parsedUrl;
  let id = null;
  const splitEndpoint = pathname.split("/").filter(Boolean);

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }

  //percorre o array de rotas pegando os params e o método
  const route = routes.find(
    (objRoutes) =>
      objRoutes.endpoint === pathname && objRoutes.method === request.method
  );

  //injetando search params e id nos método request, para  validar nos controllers
  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams);
    request.params = { id };

    //método de resposta injetado no response
    response.send = function (statusCode, body) {
      response.writeHead(statusCode, { "Content-Type": "application/json" });
      response.end(JSON.stringify(body));
    };

    //validando o tipo de method
    if (["POST", "PUT"].includes(request.method)) {
      bodyParser(request, () => route.handler(request, response));
    } else {
      route.handler(request, response);
    }
  } else {
    response.writeHead(404, { "Content-type": "text/html" });
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
  }
});

//rodando o servidor na porta 3000
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
