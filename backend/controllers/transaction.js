// controllers/transaction.js
const Transaction = require('../models/transaction');


exports.getTransactions = async (req, res) => {
  try {
    const { month, year, type, category } = req.query;
    // No authentication: start with all transactions
    let query = {};

    // Filter by type
    if (type) {
      query.type = type;
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by month/year
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      query.date = { $gte: startDate, $lte: endDate };
    }

    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .limit(100);

    // Calculate totals
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    res.json({
      transactions,
      summary: {
        balance,
        income: totalIncome,
        expense: totalExpense
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Create a transaction
//POST /api/transactions
exports.createTransaction = async (req, res) => {
  try {
    const { amount, type, category, description, date } = req.body;

    const transaction = await Transaction.create({
      amount,
      type,
      category,
      description,
      date: date || Date.now()
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update a transaction
//PUT /api/transactions/:id
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    Object.keys(req.body).forEach(key => {
      transaction[key] = req.body[key];
    });

    await transaction.save();
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete a transaction
//DELETE /api/transactions/:id
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get monthly summary
// GET /api/transactions/summary/monthly
exports.getMonthlySummary = async (req, res) => {
  try {
    const { year } = req.query;
    const currentYear = year || new Date().getFullYear();

    const monthlyData = await Transaction.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { month: { $month: "$date" } },
          income: {
            $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] }
          },
          expense: {
            $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] }
          }
        }
      },
      {
        $sort: { "_id.month": 1 }
      }
    ]);

    res.json(monthlyData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
