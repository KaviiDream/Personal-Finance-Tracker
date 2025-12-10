// controllers/category.js
const Category = require('../models/category');

// Get all categories
// GET /api/categories
exports.getCategories = async (req, res) => {
  try {
    // No authentication: return all categories
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a category
// POST /api/categories
exports.createCategory = async (req, res) => {
  try {
    // No user field; just use body
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};