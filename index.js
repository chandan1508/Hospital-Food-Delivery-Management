import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import pantryRoutes from './routes/pantryRoutes.js'; // Adjust path as per your project structure
import authRoutes from './routes/authRoutes.js'; // Authentication routes
import patientRoutes from './routes/patientRoutes.js'; // Patient CRUD routes
import dietChartRoutes from './routes/dietChartRoutes.js'; // Diet chart routes

import { connectDb } from './database/db.js'; // Database connection logic

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies
// app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routes
app.use('/api/auth', authRoutes); // User authentication routes
app.use('/api/patients', patientRoutes); // Patient CRUD operations
app.use('/api/dietcharts', dietChartRoutes); // Diet chart operations
app.use('/api/pantry', pantryRoutes); // Pantry and delivery management routes

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Hospital Food Management System API is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDb();
});
