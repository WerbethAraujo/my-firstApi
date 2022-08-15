let users = require("../mocks/users");

//array com todos os controllers
module.exports = {
  //Lista todos os úsuarios
  listUsers(request, response) {
    const { order } = request.query;
    const sortdUsers = users.sort((antes, dpois) => {
      if (order === "asc") {
        return antes.id < dpois.id ? 1 : -1;
      } else {
        return antes.id > dpois.id ? 1 : -1;
      }
    });

    response.send(200, sortdUsers);
  },
  //busca um úsuario pelo id
  getUserById(request, response) {
    const { id } = request.params;

    const user = users.find((user) => user.id === Number(id));
    if (!user) {
      return response.send(400, { Error: "User not found" });
    } else {
      response.send(200, user);
    }
  },

  //cria um novo úsuario
  createUser(request, response) {
    const { body } = request;

    const lastUserId = users[users.length - 1].id;
    const newUser = {
      id: lastUserId + 1,
      name: body.name,
      age: body.age,
    };
    users.push(newUser);

    response.send(200, newUser);
  },

  //atualiza os dados de um úsuario
  updateUser(request, response) {
    let { id } = request.params;
    id = Number(id);

    const { name, age } = request.body;

    const userExists = users.find((user) => user.id === id);
    if (!userExists) {
      return response.send(400, { Error: "user not found" });
    }
    users = users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          name,
          age,
        };
      }
      return user;
    });
    response.send(200, { id, name, age });
  },
  //apaga um úsuario
  deleteUser(request, response) {
    let { id } = request.params;

    id = Number(id);

    const userExists = users.find((user) => user.id === id);
    if (!userExists) {
      return response.send(400, { Error: "user not found" });
    }

    users = users.filter((user) => user.id !== id);
    response.send(200, { Deletad: "Successfully deletad" });
  },
};
