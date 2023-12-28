const userController = require("../controllers/userController");
const Joi = require("joi");

module.exports = [
  {
    method: "POST",
    url: "/sign-up",
    // schema: {
    //   body: Joi.object()
    //     .keys({
    //       firstName: Joi.string().min(5).max(50).required(),
    //       lastName: Joi.string().min(5).max(50),
    //     })
    //     .required(),
    // },
    // schemaCompiler: (schema) => (data) => Joi.validate(data, schema),

    handler: userController.signUp,
  },
  {
    method: "POST",
    url: "/login",
    preHandler: [
      (request, reply, next) => {
        // validate body data
      },
      (request, reply, next) => {
        // request.body.password = getEncryptedPass(request.body.password)
      },
    ],
    handler: userController.login,
  },
  {
    method: "GET",
    url: "/profile",
    preHandler: (request, reply, next) => {
      console.log("PREHANDLER----------");
      if (false) {
        next();
      } else {
        reply.send(234);
      }
    },
    handler: userController.handleGetUserProfile,
  },
];
