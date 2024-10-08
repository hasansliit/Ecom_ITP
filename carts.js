// routes/cart.js
const express = require('express');
const CartItem = require('../models/CartItem');

const router = express.Router();

// Route to get all cart items
router.get('/', async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new cart item
router.post('/', async (req, res) => {
  const cartItem = new CartItem(req.body);
  try {
    const savedItem = await cartItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update quantity of a cart item
router.patch('/:id', async (req, res) => {
  try {
    const updatedItem = await CartItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove a cart item
router.delete('/:id', async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
