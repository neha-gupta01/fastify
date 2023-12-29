const userController = require("../controllers/userController");
// const Joi = require("joi");

// const signUpSchema = {
//   body: Joi.object().keys({
//     firstName: Joi.string().min(5).max(50).required(),
//     lastName: Joi.string().min(5).max(50),
//     email: Joi.string().email().required(),
//     password: Joi.string().min(8).required(),
//     confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
//   }),
// };

// const signUpPreHandler = async (request, reply, done) => {
//   try {
//     await request.validate(signUpSchema);
//     done();
//   } catch (error) {
//     reply.status(400).send({
//       status: "error",
//       message: "Validation error",
//       details: error.details,
//     });
//   }
// };
module.exports = [
  {
    method: "POST",
    url: "/signup",
   // schema: signUpSchema,
    //preHandler: signUpPreHandler,
    handler: userController.signUp,
  },
  {
    method: "POST",
    url: "/login",
    // preHandler: [
    //   (request, reply, next) => {
    //     // validate body data
    //   },
    //   (request, reply, next) => {
    //     // request.body.password = getEncryptedPass(request.body.password)
    //   },
    // ],
    handler: userController.login,
  },
  {
    method: "GET",
    url: "/profile",
    // preHandler: (request, reply, next) => {
    //   console.log("PREHANDLER----------");
    //   if (false) {
    //     next();
    //   } else {
    //     reply.send(234);
    //   }
    // },
    handler: userController.handleGetUserProfile,
  },
];
