const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://chitransh:chitranshdb@gym.zkqk4cq.mongodb.net/?retryWrites=true&w=majority&appName=Gym"
  )
  .then(() => {
    console.log("DB Conncted...");
  });
