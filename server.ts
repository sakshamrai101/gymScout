import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import gymRoutes from "./routes/gyms.js";

// Define __dirname for ES modules compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());  // Enable CORS for all origins
app.use(express.json());

// API Routes
app.use("/api/gyms", gymRoutes);

// Serve static files from the React app
app.use(express.static(path.resolve(__dirname, "../build")));

// Default route for serving the React app
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../build", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
