const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING).then(() => {
  console.log("Connected");
});

mongoose.set("debug", true);
