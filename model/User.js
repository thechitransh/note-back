const mongoose = require("mongoose");

const User = mongoose.model(
  "user",
  new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "note",
      },
    ],
  })
);

module.exports = { User };
