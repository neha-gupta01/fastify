const fastify = require("fastify")({ logger: true });

let users = [
  {
    id: 1,
    name: "neha",
  },
  {
    id: 2,
    name: "Sneha",
  },
];
fastify.get("/users", (request, reply) => {
  reply.send(users);
});

fastify.get("/users/:id", (request, reply) => {
  const userId = request.params.id;
  const user = users.find((user) => user.id === userId);
  if (user) {
    reply.send(user);
  } else {
    reply.status(404).send({ error: "user not found" });
  }
});

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
