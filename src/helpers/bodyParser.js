//função que recebe os dados do body da request e concatena, retornando o body completo
//para os métodos Put, patch e post
function bodyParser(request, callback) {
  let body = "";

  request.on("data", (chunck) => {
    body += chunck;
  });

  request.on("end", () => {
    body = JSON.parse(body);
    request.body = body;
    callback();
  });
}

module.exports = bodyParser;
