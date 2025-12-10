// routes/goal.js
const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goal');

router
  .route('/')
  .get(goalController.getGoals)
  .post(goalController.createGoal);

router
  .route('/:id')
  .put(goalController.updateGoal)
  .delete(goalController.deleteGoal);

module.exports = router;
