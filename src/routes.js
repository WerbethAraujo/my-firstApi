//importa os controllers
const UserController = require("./controllers/UserController");

//array com todas as rotas
module.exports = [
  //rota pra busca todos os úsuarios
  {
    endpoint: "/users",
    method: "GET",
    handler: UserController.listUsers,
  },

  //roda que busca um úsuario por id
  {
    endpoint: "/users/:id",
    method: "GET",
    handler: UserController.getUserById,
  },

  //rota que cria um novo úsuario
  {
    endpoint: "/users",
    method: "POST",
    handler: UserController.createUser,
  },

  //rota que atualiza um úsuario
  {
    endpoint: "/users/:id",
    method: "PUT",
    handler: UserController.updateUser,
  },

  //rota que deleta um úsuario
  {
    endpoint: "/users/:id",
    method: "DELETE",
    handler: UserController.deleteUser,
  },
];
