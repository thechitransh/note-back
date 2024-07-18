const mongoose = require("mongoose");

const User = mongoose.model(
  "NotesUser",
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
