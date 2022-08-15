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

    response.send(200, sortdUsers);
  },

  getUserById(request, response) {
    const { id } = request.params;

    const user = users.find((user) => user.id === Number(id));
    if (!user) {
      return response.send(400, { Error: "User not found" });
    } else {
      response.send(200, user);
    }
  },
};
