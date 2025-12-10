// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['income', 'expense', 'both'],
    default: 'expense'
  },
  icon: {
    type: String,
    default: '💰'
  },
  monthlyBudget: {
    type: Number,
    default: 0
  },
  isDefault: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Category', categorySchema);