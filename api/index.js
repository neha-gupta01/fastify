const fastify = require("fastify")({ logger: true });
require("dotenv").config();
require("../db");
const path = require("node:path");

fastify.register(require("@fastify/cors"), {
  origin: true,
});


// fastify.register(require("@fastify/static"), {
//   root: path.join(__dirname, "public"),
//   prefix: "/public/",
// });

fastify.register(require("@fastify/formbody"));

fastify.register(require("fastify-multipart"), {
  // attachFieldsToBody: true,
  addToBody: true,
});

fastify.listen({ port: 3001 }).then(() => {
  console.log("Logged");
});

fastify.get("/", (req, reply) => {
  reply.send({ hello: "world" });
});

let allRoutes = require("../routes");
allRoutes.forEach((route) => {
  fastify.route(route);
});


