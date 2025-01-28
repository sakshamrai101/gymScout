import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import Gym from "../models/Gym.js";
import connectDB from "../config/db.js";
import { fetchGymsFromGoogle } from "../utils/GooglePlacesService.js";
import { getDistance } from "geolib";

dotenv.config();
const router = express.Router();

// Route for Google Places API Autocomplete feature
router.get("/autocomplete", async (req, res) => {
    const { input } = req.query;

    if (!input) {
        return res.status(400).json({ message: "Input query is required." });
    }

    try {
        const response = await axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json", {
            params: {
                input,
                key: process.env.GOOGLE_MAPS_KEY,
                types: "geocode",
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
        res.status(500).json({ message: "Failed to fetch data from Google Places API" });
    }
});

// Route to fetch nearby gyms from database or Google API
router.get("/nearby", async (req, res) => {
    const { lat, lng, radius, limit, offset, rating } = req.query;

    if (!lat || !lng || !radius) {
        return res.status(400).json({ message: "Latitude, longitude, and radius are required." });
    }

    try {
        await connectDB();

        const latitude = parseFloat(lat as string);
        const longitude = parseFloat(lng as string);
        const searchRadius = parseFloat(radius as string);
        const gymLimit = parseInt(limit as string) || 10;
        const gymOffSet = parseInt(offset as string) || 0;
        const minRating = parseFloat(rating as string) || 1;

        console.log(
            `Searching gyms near (${latitude}, ${longitude}) within ${searchRadius} meters. Limit: ${gymLimit}, Offset: ${gymOffSet}, Min Rating: ${minRating}`
        );

        let gyms = await Gym.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: searchRadius,
                },
            },
            rating: { $gte: minRating },
        })
            .sort({ rating: -1 })
            .limit(gymLimit)
            .skip(gymOffSet)
            .lean();

        gyms = gyms.map((gym) => {
            const distanceInMeters = getDistance(
                { latitude, longitude },
                {
                    latitude: gym.location.coordinates[1],
                    longitude: gym.location.coordinates[0],
                }
            );
            return {
                ...gym,
                distance: Number((distanceInMeters / 1609.34).toFixed(2)), // Ensure distance is a number
            };
        });

        if (gyms.length === 0) {
            console.log("No gyms found in DB, fetching from Google Places API...");
            await fetchGymsFromGoogle(latitude, longitude);
            gyms = (await Gym.find({
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [longitude, latitude],
                        },
                        $maxDistance: searchRadius,
                    },
                },
                rating: { $gte: minRating },
            })
                .sort({ rating: -1 })
                .limit(gymLimit)
                .skip(gymOffSet)
                .lean()).map((gym) => {
                    const distanceInMeters = getDistance(
                        { latitude, longitude },
                        {
                            latitude: gym.location.coordinates[1],
                            longitude: gym.location.coordinates[0],
                        }
                    );
                    return {
                        ...gym,
                        distance: Number((distanceInMeters / 1609.34).toFixed(2)),
                    };
                });
        }

        console.log(`Found ${gyms.length} gyms in the radius.`);
        res.status(200).json({ gyms });
    } catch (error) {
        console.error("Error fetching nearby gyms:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
