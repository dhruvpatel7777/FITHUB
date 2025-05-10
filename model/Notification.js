const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  message: { type: String, required: true },
  link: { type: String },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User',}, // Assuming 'User' is your user model
  reply: { type: String } // If you want to store multiple replies, use [String] instead
});

module.exports = mongoose.model("Notification", notificationSchema);
