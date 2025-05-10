const mongoose = require("mongoose");

const PlanOrderSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  country: {
    type: String,
    // required: true,
  },
  plan:{
  },
  transactionId:{
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  }},
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

module.exports = mongoose.model("Planorder", PlanOrderSchema);
