const mongoose = require("mongoose");

const Subject = mongoose.Schema({ name: String }, { timestamps: true });

module.exports = mongoose.model("Subject", Subject);
