const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./databse/db');
const userRoutes = require('./routes/userRoutes'); // ✅ Import routes
const cookieParser = require('cookie-parser');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

dotenv.config();
connectDB();
app.use(cookieParser());

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // ✅ No trailing slash
  credentials: true // ✅ Enables cookie and Authorization header sharing
}));
app.use(express.json()); // Parse JSON

// Routes
app.use('/api/users', userRoutes); // ✅ Use user routes
app.use('/api/transactions', transactionRoutes);



module.exports = app;
