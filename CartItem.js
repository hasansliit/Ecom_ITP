// models/CartItem.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  image: { type: String, required: true }
});
// Creating the CartItem model from the schema, to interact with the 'cartitems' collection in MongoDB
const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
