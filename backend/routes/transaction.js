// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction');



router.route('/')
  .get(transactionController.getTransactions)
  .post(transactionController.createTransaction);

router.route('/:id')
  .put(transactionController.updateTransaction)
  .delete(transactionController.deleteTransaction);

router.get('/summary/monthly', transactionController.getMonthlySummary);

module.exports = router;