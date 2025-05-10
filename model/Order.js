const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define a schema for the product details that will be embedded in the order
const ProductDetailSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
});

// Define the Order schema with an array of ProductDetailSchema
const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  feedback: {
    type: String,
  },
  products: [ProductDetailSchema], // Embed the product details directly
  status: {
    type: String,
    // Optionally, you might want to add validation here, e.g., enum: ['pending', 'completed']
  },
  name: {
    type: String,
    // required: true // Uncomment if name is required
  },
  address: {
    type: String,
    // required: true // Uncomment if address is required
  },
  phone: {
    type: String,
    // required: true // Uncomment if phone is required
  },
  email: {
    type: String,
    // required: true // Uncomment if email is required
  },
  zipcode: {
    type: String,
    // required: true // Uncomment if zipcode is required
  },
  country: {
    type: String,
    // required: true // Uncomment if country is required
  },
  totalamount: {
    type: Number,
    // required: true // Uncomment if totalamount is required
  },
  transactionId: {
    type: String,
  },
  method: {
    type: String,
  }
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
