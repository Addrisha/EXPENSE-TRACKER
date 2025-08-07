const Transaction = require('../models/Transaction');

// CREATE a transaction
exports.createTransaction = async (req, res) => {
    try {
        const {
            title,
            amount,
            type,
            category,
            date,
            description,
        } = req.body;

        const transaction = await Transaction.create({
            title,
            amount,
            type,
            category: category || 'Other',
            date: date || Date.now(),
            description: description || '',
            user: req.user._id,
        });

        res.status(201).json({
            message: 'Transaction created successfully',
            data: transaction,
        });
    } catch (error) {
        console.error('Error creating transaction:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

// GET all transactions for the logged-in user
exports.getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });
    res.status(200).json({
      message: 'Fetched transactions successfully',
      transactions: transactions // ✅ use real data here
    });
  } catch (error) {
    console.error('Error fetching transactions:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

