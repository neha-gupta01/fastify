const Order = require("../models/Order");

const placeOrder = async (request, reply) => {
  try {
    const { items, totalPrice } = request.body;

    const orderItems = items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    const newOrder = new Order({ items: orderItems, totalPrice });

    const savedOrder = await newOrder.save();

    console.log("Order placed successfully:", savedOrder);
    reply.send({ order: savedOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    reply.status(500).send({ success: false, error: "Internal server error" });
  }
};

module.exports = { placeOrder };
