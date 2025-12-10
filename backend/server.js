const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const transactionRoutes = require('./routes/transaction');
const categoryRoutes = require('./routes/category');

// Load environment variables first
dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// Debug: Check if MONGODB_URL is loaded
console.log('MONGODB_URL:', process.env.MONGODB_URL);

const URL = process.env.MONGODB_URL || 'mongodb+srv://kavinduhewamadduma:lrJhe9GXtSojVmrw@cluster0.rv2ijhs.mongodb.net/Finance_Tracker?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(URL)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/categories', categoryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});