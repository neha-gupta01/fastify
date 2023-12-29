const fastify = require("fastify")({ logger: true });
require("dotenv").config();
require("../db");

fastify.register(require("@fastify/cors"), {
  origin: true,
});

fastify.register(require("@fastify/formbody"));

fastify.register(require("fastify-multipart"), { attachFieldsToBody: true });

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
