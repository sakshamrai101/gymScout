import mongoose, { mongo } from "mongoose";
import * as dotenv from "dotenv";
import Gym from "../models/gymModels.js";
import connectDB from "../config/db.js";


// Load up the environment variables ....
dotenv.config({ path: "./.env" });

// Test fn to create a sample gym entity:
const createSampleGym = async () => {
    try {

        // A sample gym document in the db looks like this .... 
        const sampleGym = new Gym({
            name: "Pro Ultimate Gyms",
            location: { lat: 28.601072430966298, lng: 77.08197106786038 },
            address: "Mahivir Enclave, Metro Station, B-8, near Dashrath Puri",
            priceRange: {min: 20, max: 500},
            socialMedia: {
                instagram: "https://www.instagram.com/mahavirenclv_proultimategyms/?hl=en",
                website: "https://proultimategyms.in/mahavir-enclave-delhi/",
            },
            reviews: [
                {rating: 4, comment: "Good machines."},
                {rating: 5, commment: " Nice Gym."},
            ],
        });

        // Saving this newly created MongoDB document into the db:
        const savedGym = await sampleGym.save();
        console.log("Sample Gym Saved Succesfully", savedGym);
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
        }
        else {
            console.log(`An unknown error occurred. `);
        }
        process.exit(1);
    } finally {
        mongoose.connection.close() 
    }
};

// Run the test:
(async () => {
    await connectDB();
    await createSampleGym();
})();