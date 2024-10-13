const express = require('express');
const router = express.Router();
const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');

// Add points to wallet
router.post('/add-points', async (req, res) => {
  const { userId, points } = req.body;
  console.log('Received request to add points:', { userId, points });

  try {
    let wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      console.log('Creating new wallet for user:', userId);
      wallet = new Wallet({ userId, points });
    } else {
      console.log('Updating existing wallet for user:', userId);
      wallet.points += points;
    }

    await wallet.save();
    console.log('Wallet updated:', wallet);

    const transaction = new Transaction({ userId, points, date: new Date() });
    await transaction.save();
    console.log('Transaction saved:', transaction);

    res.send(wallet);
  } catch (error) {
    console.error('Error adding points:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Get wallet points
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  console.log('Received request to get wallet points for user:', userId);

  try {
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      console.log('Wallet not found for user:', userId);
      return res.status(404).send('Wallet not found');
    }
    console.log('Wallet found:', wallet);
    res.send(wallet);
  } catch (error) {
    console.error('Error fetching wallet:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Get transaction history
router.get('/:userId/transactions', async (req, res) => {
  const { userId } = req.params;
  console.log('Received request to get transaction history for user:', userId);

  try {
    const transactions = await Transaction.find({ userId });
    console.log('Transactions found:', transactions);
    res.send(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
