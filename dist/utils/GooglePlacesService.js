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
import axios from "axios"; // for making HTTP requests
import Gym from "../models/Gym.js"; // to interact with the MongoDB model
import connectDB from "../config/db.js";
import mongoose from "mongoose";
const { connection } = mongoose;
const API = process.env.GOOGLE_MAPS_KEY;
// Function to fetch gyms using Google's new Places API:
export const fetchGymsFromGoogle = (lat, lng) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        yield connectDB();
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
        const response = yield axios.post(`https://places.googleapis.com/v1/places:searchNearby?key=${API}`, requestBody, {
            headers: {
                "Content-Type": "application/json",
                "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.id"
            }
        });
        // Extract results from the API call:
        const gyms = response.data.places || [];
        console.log(`Fetched ${gyms.length} gyms from Google Places API`);
        for (const gym of gyms) {
            yield Gym.findOneAndUpdate({ placeId: gym.id }, // Match by unique Place ID
            {
                name: ((_a = gym.displayName) === null || _a === void 0 ? void 0 : _a.text) || "Unknown Gym",
                address: gym.formattedAddress || "Address not available",
                location: {
                    type: "Point",
                    coordinates: [gym.location.longitude, gym.location.latitude], // [lng, lat]
                },
                rating: gym.rating || 0,
                totalRatings: gym.userRatingCount || 0,
                placeId: gym.id,
                fetchedAt: new Date(),
            }, { upsert: true, new: true } // Create new document if it doesn't exist
            );
        }
        console.log(`Successfully processed and stored gyms for location (${lat}, ${lng}).`);
    }
    catch (error) {
        console.error("Error in fetching gyms from Places API:", ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data) || error.message);
        throw error;
    }
});
// Function to retrieve gyms from the database within a given radius:
export const getGyms = (lat, lng, radius) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // MongoDB geospatial query to find gyms within the given radius:
        const gyms = yield Gym.find({
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
    }
    catch (error) {
        console.error("Error in fetching gyms from the database", error);
        throw error;
    }
});
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
