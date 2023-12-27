const userController = require("../controllers/userController");

module.exports = [
  {
    method: "POST",
    url: "/signup",
    handler: userController.signUp,
  },
  {
    method: "POST",
    url: "/login",
    handler: userController.login,
  },
];
