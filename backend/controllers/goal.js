// controllers/goal.js
const Goal = require('../models/goal');

// Get all goals
// GET /api/goals
exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({}).sort({ createdAt: -1 });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a goal
// POST /api/goals
exports.createGoal = async (req, res) => {
  try {
    const { name, targetAmount, currentAmount } = req.body;

    const goal = await Goal.create({
      name,
      targetAmount,
      currentAmount: currentAmount || 0,
    });

    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a goal
// PUT /api/goals/:id
exports.updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    Object.keys(req.body).forEach((key) => {
      goal[key] = req.body[key];
    });

    await goal.save();
    res.json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a goal
// DELETE /api/goals/:id
exports.deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.json({ message: 'Goal deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
