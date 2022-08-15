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
      response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(sortdUsers));
  },

  getUserById(request, response) {
    const { id } = request.params;

    const user = users.find((user) => user.id === Number(id));
    if (!user) {
      response.writeHead(400, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ Error: "User not found" }));
    } else {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ user }));
    }
  },
};
