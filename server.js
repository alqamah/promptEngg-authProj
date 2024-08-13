require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorLogger = require('./middlewares/logger');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.options('*', cors());
app.use(express.json());

// Error handling middleware
app.use(errorLogger);

// Define Routes
app.use('/api/users', require('./routes/users'));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
