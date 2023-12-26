const loginController = require("../controllers/userLoginController");

module.exports = [
  {
    method: "POST",
    url: "/login",
    handler: loginController.login,
  },
];
