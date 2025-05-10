const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
    unique: true,
  },
  phone: {
    type: String,
    // required: true,
  },
  age: {
    type: Number,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  subscription: {},
  status:{
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  }},
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

module.exports = mongoose.model("Member", memberSchema);
