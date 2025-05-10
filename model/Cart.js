const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
  },
}, { timestamps: true });

const Product = mongoose.model('cart', CartSchema);

module.exports = Product;
