const signUpController = require("../controllers/userSignUpController");

module.exports = [
  {
    method: "POST",
    url: "/signup",
    handler: signUpController.signUp,
  },
];
