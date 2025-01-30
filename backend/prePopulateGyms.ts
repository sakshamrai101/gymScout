import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { fetchGymsFromGoogle } from "./utils/GooglePlacesService.js";
import connectDB from "./config/db.js";

// Array of cities with [latitude, longitude]
const locations = [
    [28.5995, 77.0864], // Kumudi Apartments
];

const RADIUS = 1000; // Search radius in meters (100 km)

// Prepopulate gyms into the database
const prepopulateGyms = async () => {
    try {
        await connectDB(); // Connect to MongoDB

        for (const [lat, lng] of locations) {
            console.log(`Fetching gyms for location (${lat}, ${lng})...`);
            try {
                await fetchGymsFromGoogle(lat, lng);
            } catch (fetchError) {
                console.error(`Error fetching gyms for (${lat}, ${lng}):`, fetchError);
            }
        }

        console.log("Prepopulation complete.");
    } catch (error) {
        console.error("Error during prepopulation:", error);
    } finally {
        // Close the connection after all operations are complete
        mongoose.connection.close();
        console.log("MongoDB connection closed.");
    }
};

prepopulateGyms();
