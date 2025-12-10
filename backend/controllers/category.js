// controllers/categoryController.js
const Category = require('../models/category');

//Get all categories
//GET /api/categories
exports.getCategories = async (req, res) => {
  try {
    // Get user's categories and default categories
    const userCategories = await Category.find({
      $or: [
        { user: req.user._id },
        { isDefault: true }
      ]
    });
    res.json(userCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Create a category
//POST /api/categories
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create({
      ...req.body,
      user: req.user._id
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};