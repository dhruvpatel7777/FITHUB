const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bookedAt: Date,
});

module.exports = mongoose.model("Booking", bookingSchema);
