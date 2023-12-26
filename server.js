// const fastify = require("fastify")();
// const cors = require("@fastify/cors");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config();

// fastify.register(cors, {
//   origin: true,
// });

// mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING).then(() => {
//   console.log("Connected");
// });

// fastify.listen({ port: 3001 }).then(() => {
//   console.log("Logged");
// });

// fastify.get("/", (req, reply) => {
//   reply.send({ hello: "world" });
// });

// let allRoutes = require("./routes");
// allRoutes.forEach((route) => {
//   fastify.route(route);
// });
