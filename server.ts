// server.ts

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './config/db';
import path from 'path';
import router from './routes/gyms';

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/gyms', router);

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

const PORT = process.env.PORT || 500;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
