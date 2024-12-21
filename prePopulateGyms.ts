import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { fetchGymsFromGoogle } from "./utils/GooglePlacesService";
import connectDB from "./config/db";

// Array of cities with [latitude, longitude]
const locations = [
    [28.6139, 77.2090], // Delhi
    [19.0760, 72.8777], // Mumbai
    [13.0827, 80.2707], // Chennai
    [12.9716, 77.5946], // Bangalore
    [22.5726, 88.3639], // Kolkata
    [40.7128, -74.0060], // New York
    [34.0522, -118.2437], // Los Angeles
    [41.8781, -87.6298], // Chicago
    [29.7604, -95.3698], // Houston
    [37.7749, -122.4194], // San Francisco
];

const RADIUS = 10000; // Search radius in meters (10 km)

// Prepopulate gyms into the database
const prepopulateGyms = async () => {
    await connectDB(); // Connect to MongoDB

    for (const [lat, lng] of locations) {
        console.log(`Fetching gyms for location (${lat}, ${lng})...`);
        await fetchGymsFromGoogle(lat, lng, RADIUS);
    }

    console.log("Prepopulation complete.");
    mongoose.connection.close(); // Close connection
};

prepopulateGyms();
