const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken'); // ✅ should be defined
const {
    createTransaction,
    getUserTransactions,
} = require('../controllers/transactionController'); // ✅ should be valid functions

router.post('/', verifyToken, createTransaction); // ✅ check these are all functions
router.get('/', verifyToken, getUserTransactions);

module.exports = router;
