const OrderController = require("../controllers/orderController");

module.exports = [
  {
    method: "POST",
    url: "/orders",
    handler: OrderController.placeOrder,
  },
];
