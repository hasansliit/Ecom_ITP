const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        // Regex for validating email format
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: 'Please enter a valid email address',
    },
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        // Regex for validating phone number format
        return /^\d{10,15}$/.test(v); // Adjust based on your region
      },
      message: 'Please enter a valid phone number',
    },
  },
  orderNotes: {
    type: String,
    trim: true,
    default: '',
  },
  products: {
    type: Number,
    required: true,
    default: 53.98, // Default value from your example
  },
  shipping: {
    type: String,
    default: 'Gratis',
  },
  totalAmount: {
    type: Number,
    required: true,
    default: 53.98, // Default value from your example
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Bill = mongoose.model('Bill', BillSchema);

module.exports = Bill;
