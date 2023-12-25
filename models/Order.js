const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      productId: Number,
      quantity: Number,
      price: Number,
    },
  ],
  totalPrice: Number,
});

const order = mongoose.model("orders", orderSchema);

module.exports = order;
