const Order = require("../models/Order");

const placeOrder = (request, reply) => {
  const { items, totalPrice } = request.body;

  const expectedTotalPrice = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  if (expectedTotalPrice !== totalPrice) {
    return reply.status(400).send({
      success: false,
      error: "Cart total price does not match the expected total price",
    });
  }
  const orderItems = items.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    price: item.price,
  }));

  const newOrder = new Order({ items: orderItems, totalPrice });

  newOrder
    .save()
    .then((savedOrder) => {
      console.log("Order placed successfully:", savedOrder);
      reply.send({ order: savedOrder });
    })
    .catch((error) => {
      console.error("Error placing order:", error);
      reply
        .status(500)
        .send({ success: false, error: "Internal server error" });
    });
};

module.exports = { placeOrder };
