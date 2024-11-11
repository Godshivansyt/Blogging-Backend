// app.js
const express = require('express');
const connectDB = require('./config/db');
const postRoutes = require('./routes/postRoutes');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();

const app = express();
connectDB();
app.use(express.json());

app.use('/api', postRoutes);
app.use(errorHandler);

module.exports = app;
