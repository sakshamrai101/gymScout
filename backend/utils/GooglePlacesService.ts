import dotenv from "dotenv";
dotenv.config();
import axios from "axios"; // for making HTTP requests
import Gym from "../models/Gym.js"; // to interact with the MongoDB model
import connectDB from "../config/db.js";
import mongoose from "mongoose";

const { connection } = mongoose;
const API = process.env.GOOGLE_MAPS_KEY;

// Function to fetch gyms using Google's new Places API:
export const fetchGymsFromGoogle = async (lat: number, lng: number): Promise<void> => {
    try {
        await connectDB();

        // Prepare request body
        const requestBody = {
            includedTypes: ["gym"],
            maxResultCount: 20,
            rankPreference: "DISTANCE",
            locationRestriction: {
                circle: {
                    center: { latitude: lat, longitude: lng },
                    radius: 1687 // 1 mile in meters
                }
            }
        };

        // Make the API call to the new Places API with POST request
        const response = await axios.post(
            `https://places.googleapis.com/v1/places:searchNearby?key=${API}`,
            requestBody,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.id"
                }
            }
        );

        // Extract results from the API call:
        const gyms = response.data.places || [];
        console.log(`Fetched ${gyms.length} gyms from Google Places API`);

        for (const gym of gyms) {
            await Gym.findOneAndUpdate(
                { placeId: gym.id }, // Match by unique Place ID
                {
                    name: gym.displayName?.text || "Unknown Gym",
                    address: gym.formattedAddress || "Address not available",
                    location: {
                        type: "Point",
                        coordinates: [gym.location.longitude, gym.location.latitude], // [lng, lat]
                    },
                    rating: gym.rating || 0,
                    totalRatings: gym.userRatingCount || 0,
                    placeId: gym.id,
                    fetchedAt: new Date(),
                },
                { upsert: true, new: true } // Create new document if it doesn't exist
            );
        }

        console.log(`Successfully processed and stored gyms for location (${lat}, ${lng}).`);
    } catch (error: any) {
        console.error("Error in fetching gyms from Places API:", error.response?.data || error.message);
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
