const users = require("../mocks/users");

module.exports = {
  listUsers(request, response) {
    const { order } = request.query;
    const sortdUsers = users.sort((antes, dpois) => {
      if (order === "asc") {
        return antes.id > dpois.id ? 1 : -1;
      } else {
        return antes.id < dpois.id ? 1 : -1;
      }
    });

    if (order === "desc")
      response.writeHead(200, { "Content-Type": "text/html" });
    response.end(JSON.stringify(sortdUsers));
  },
};
