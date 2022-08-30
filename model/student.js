const mongoose = require("mongoose");

const Student = new mongoose.Schema(
  {
    name: { type: String },
    rollno: { type: String },
    address: { type: String },
    mobile_no: { type: Number },
    standard: { type: mongoose.Types.ObjectId, ref: "Standard" },
    subject: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Subject",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", Student);
