const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  product: { type: String, required: true }, // store custom productId
  qty: { type: Number, default: 1 },
});

module.exports = mongoose.model('CartItem', CartItemSchema);
