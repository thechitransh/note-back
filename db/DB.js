const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Notes").then(() => {
  console.log("DB Conncted...");
});
