import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js"; // Note the ".js" extension
import path from "path";
import router from "./routes/gyms.js"; // Note the ".js" extension

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/gyms", router);

// Serve static files
app.use(express.static(path.join(process.cwd(), "public"))); // Update for ES module pathing

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
