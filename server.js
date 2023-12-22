const fastify = require("fastify")();
const cors = require("@fastify/cors");
const mongoose = require("mongoose");

fastify.register(cors, {
  origin: true,
});

mongoose
  .connect("mongodb+srv://neha:neha123@cluster.5xagc1y.mongodb.net/MyDB")
  .then(() => {
    console.log("Connected");
  });

fastify.listen({ port: 3001 }).then(() => {
  console.log("Logged");
});

fastify.get("/", (req, reply) => {
  reply.send({ hello: "world" });
});

let allRoutes = require("./routes");
allRoutes.forEach((route) => {
  fastify.route(route);
});
