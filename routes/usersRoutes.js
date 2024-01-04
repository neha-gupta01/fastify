const userController = require("../controllers/userController");
const Joi = require("joi");
const { getEncryptedString, verifyAuthToken } = require("../utils");

const signUpSchema = {
  body: Joi.object().keys({
    firstName: Joi.string().min(4).max(50).required(),
    lastName: Joi.string().min(4).max(50),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  }),
};

const loginSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  }),
};

module.exports = [
  {
    method: "POST",
    url: "/signup",
    schema: signUpSchema,
    validatorCompiler: ({ schema, method, url, httpPart }) => {
      return (data) => schema.validate(data, { abortEarly: false });
    },
    preHandler: [
      async (req, reply) => {
        req.body.password = await getEncryptedString(req.body.password);
      },
    ],
    handler: userController.signUp,
  },
  {
    method: "POST",
    url: "/login",
    schema: loginSchema,
    validatorCompiler: ({ schema, method, url, httpPart }) => {
      return (data) => schema.validate(data, { abortEarly: false });
    },
    preHandler: [
      async (req, reply) => {
        console.log(req.body.password, "...=======........");
        req.body.password = await getEncryptedString(req.body.password);
        console.log(req.body, "...........");
      },
    ],
    handler: userController.login,
  },
  {
    method: "GET",
    url: "/profile",
    preHandler: (request, reply, next) => {
      console.log("PREHANDLER----------", request.headers);
      let { user_id } = verifyAuthToken(request.headers.auth, reply);
      if (user_id) {
        request.user_id = user_id;
        next();
      }
    },
    handler: userController.handleGetUserProfile,
  },
  {
    method: "POST",
    url: "/upload",
    handler: userController.handleFileUpload,
  },
];
