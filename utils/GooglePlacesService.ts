import dotenv from "dotenv";
dotenv.config();
import axios from "axios"; // for making HTTP requests
import Gym from "../models/Gym"; // to interact with the MongoDB model
import connectDB from "../config/db";
import { connection } from "mongoose";

const API = process.env.GOOGLE_MAPS_KEY;

// Function to fetch gyms using Google's Places API:
export const fetchGymsFromGoogle = async (lat: number, lng: number, radius: number): Promise<void> => {
    try {
        await connectDB();
        // Make the API call to the Places API:
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
            {
                params: {
                    location: `${lat},${lng}`,
                    radius,
                    type: `gym`,
                    key: API,
                },
            }
        );

        // Extract results from the API call:
        const gyms = response.data.results;
        console.log(gyms.length)
        for (const gym of gyms) {
            if (gym.business_status === "OPERATIONAL") {
                await Gym.findOneAndUpdate(
                    { placeId: gym.place_id }, // Match by unique Place ID
                    {
                        name: gym.name,
                        address: gym.vicinity || "Address not available",
                        location: {
                            type: "Point",
                            coordinates: [gym.geometry.location.lng, gym.geometry.location.lat], // [lng, lat]
                        },
                        rating: gym.rating || 0,
                        totalRatings: gym.user_ratings_total || 0, // Correct field name
                        placeId: gym.place_id,
                        fetchedAt: new Date(),
                    },
                    { upsert: true, new: true } // Create new document if it doesn't exist
                );
            }
        }
        console.log(`Successfully processed and stored gyms for location (${lat}, ${lng}).`);
    } catch (error) {
        console.error("Error in fetching gyms from Places API", error);
        throw error;
    }
};

// Function to retrieve gyms from the database within a given radius:
export const getGyms = async (lat: number, lng: number, radius: number) => {
    try {
        // MongoDB geospatial query to find gyms within the given radius:
        const gyms = await Gym.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, lat], // Note: [longitude, latitude]
                    },
                    $maxDistance: radius, // Radius in meters
                },
            },
        }).select("name address location rating totalRatings"); // Select only necessary fields

        console.log(`Found ${gyms.length} gyms near (${lat}, ${lng}) within ${radius} meters.`);
        return gyms;
    } catch (error) {
        console.error("Error in fetching gyms from the database", error);
        throw error;
    }
};



// Main function to test the services:
/*
(async () => {
    try {
        await connectDB();

        // Test fetching gyms from database
        const latitude = 28.59963068377233;
        const longitude = 77.08642935993626;
        const radius = 10000;

        const gyms = await getGyms(latitude, longitude, radius);
        connection.close();
        console.log("Gyms:", gyms);
    } catch (err) {
        console.error("Error:", err);
    }
})();

*/

