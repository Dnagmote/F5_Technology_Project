const mongoose = require("mongoose");

const Standard = new mongoose.Schema(
  { standard: { type: String } },
  { timestamps: true }
);
module.exports = mongoose.model("Standard", Standard);
