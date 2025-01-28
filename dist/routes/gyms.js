var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
router.get("/autocomplete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { input } = req.query;
    if (!input) {
        return res.status(400).json({ message: "Input query is required." });
    }
    try {
        const response = yield axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json", {
            params: {
                input,
                key: process.env.GOOGLE_MAPS_KEY,
                types: "geocode",
            },
        });
        res.json(response.data);
    }
    catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
        res.status(500).json({ message: "Failed to fetch data from Google Places API" });
    }
}));
// Route to fetch nearby gyms from database or Google API
router.get("/nearby", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lat, lng, radius, limit, offset, rating } = req.query;
    if (!lat || !lng || !radius) {
        return res.status(400).json({ message: "Latitude, longitude, and radius are required." });
    }
    try {
        yield connectDB();
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);
        const searchRadius = parseFloat(radius);
        const gymLimit = parseInt(limit) || 10;
        const gymOffSet = parseInt(offset) || 0;
        const minRating = parseFloat(rating) || 1;
        console.log(`Searching gyms near (${latitude}, ${longitude}) within ${searchRadius} meters. Limit: ${gymLimit}, Offset: ${gymOffSet}, Min Rating: ${minRating}`);
        let gyms = yield Gym.find({
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
            const distanceInMeters = getDistance({ latitude, longitude }, {
                latitude: gym.location.coordinates[1],
                longitude: gym.location.coordinates[0],
            });
            return Object.assign(Object.assign({}, gym), { distance: Number((distanceInMeters / 1609.34).toFixed(2)) });
        });
        if (gyms.length === 0) {
            console.log("No gyms found in DB, fetching from Google Places API...");
            yield fetchGymsFromGoogle(latitude, longitude);
            gyms = (yield Gym.find({
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
                const distanceInMeters = getDistance({ latitude, longitude }, {
                    latitude: gym.location.coordinates[1],
                    longitude: gym.location.coordinates[0],
                });
                return Object.assign(Object.assign({}, gym), { distance: Number((distanceInMeters / 1609.34).toFixed(2)) });
            });
        }
        console.log(`Found ${gyms.length} gyms in the radius.`);
        res.status(200).json({ gyms });
    }
    catch (error) {
        console.error("Error fetching nearby gyms:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
export default router;
