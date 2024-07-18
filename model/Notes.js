const mongoose = require("mongoose");

const Notes = mongoose.model(
  "note",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    decripition: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
      required: true,
    },
  })
);

module.exports = { Notes };
