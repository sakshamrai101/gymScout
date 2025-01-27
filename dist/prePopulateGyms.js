var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const prepopulateGyms = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDB(); // Connect to MongoDB
        for (const [lat, lng] of locations) {
            console.log(`Fetching gyms for location (${lat}, ${lng})...`);
            try {
                yield fetchGymsFromGoogle(lat, lng);
            }
            catch (fetchError) {
                console.error(`Error fetching gyms for (${lat}, ${lng}):`, fetchError);
            }
        }
        console.log("Prepopulation complete.");
    }
    catch (error) {
        console.error("Error during prepopulation:", error);
    }
    finally {
        // Close the connection after all operations are complete
        mongoose.connection.close();
        console.log("MongoDB connection closed.");
    }
});
prepopulateGyms();
