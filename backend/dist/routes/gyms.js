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
import dotenv from "dotenv";
import Gym from "../models/Gym.js";
import connectDB from "../config/db.js";
import { fetchGymsFromGoogle } from "../utils/GooglePlacesService.js";
import { getDistance } from "geolib";
import axios from "axios";
dotenv.config();
const router = express.Router();
// ✅ Route for Google Places API Autocomplete
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
// ✅ Route to fetch nearby gyms (sorted by rating & filtered by distance)
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
        const gymOffset = parseInt(offset) || 0;
        const minRating = parseFloat(rating) || 1;
        console.log(`Searching gyms near (${latitude}, ${longitude}) within ${searchRadius} meters. Limit: ${gymLimit}, Offset: ${gymOffset}, Min Rating: ${minRating}`);
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
            .sort({ rating: -1 }) // Sort gyms by highest rating
            .limit(gymLimit)
            .skip(gymOffset)
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
                .skip(gymOffset)
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
// ✅ Route to fetch a specific gym's updated data
router.get("/:gymId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gymId } = req.params;
    try {
        yield connectDB();
        const gym = yield Gym.findById(gymId).lean();
        if (!gym) {
            return res.status(404).json({ message: "Gym not found." });
        }
        res.status(200).json({ gym });
    }
    catch (error) {
        console.error("Error fetching gym data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
router.post("/:gymId/review", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("[DEBUG] Received POST /:gymId/review at:", new Date());
    const { gymId } = req.params;
    const { rating, comment } = req.body;
    if (!rating || !comment || typeof rating !== "number" || rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Valid rating (1-5) and comment are required." });
    }
    try {
        yield connectDB();
        const gym = yield Gym.findById(gymId);
        if (!gym) {
            return res.status(404).json({ message: "Gym not found." });
        }
        // ✅ Create the new review object
        const newReview = {
            rating,
            comment,
            createdAt: new Date(),
        };
        // ✅ Add review to gym reviews array **before modifying the rating**
        gym.reviews.push(newReview);
        // ✅ Recalculate the average rating dynamically
        const totalRatings = gym.reviews.length;
        const ratingSum = gym.reviews.reduce((sum, r) => sum + r.rating, 0);
        gym.rating = parseFloat((ratingSum / totalRatings).toFixed(2));
        gym.totalRatings = totalRatings;
        yield gym.save();
        return res.status(200).json({
            message: "Review added successfully!",
            updatedRating: gym.rating,
            updatedReview: newReview.comment,
        });
    }
    catch (error) {
        console.error("Error adding ratings/comments:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}));
export default router;
