"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGyms = exports.fetchGymsFromGoogle = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const axios_1 = __importDefault(require("axios")); // for making HTTP requests
const Gym_1 = __importDefault(require("../models/Gym")); // to interact with the MongoDB model
const API = process.env.GOOGLE_MAPS_KEY;
// Function to fetch gyms using Google's Places API:
const fetchGymsFromGoogle = (lat, lng, radius) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Make the API call to the Places API:
        const response = yield axios_1.default.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
            params: {
                location: `${lat},${lng}`,
                radius,
                type: `gym`,
                key: API,
            },
        });
        // Extract results from the API call:
        const gyms = response.data.results;
        for (const gym of gyms) {
            if (gym.business_status === "OPERATIONAL") {
                yield Gym_1.default.findOneAndUpdate({ placeId: gym.place_id }, // Match by unique Place ID
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
                }, { upsert: true, new: true } // Create new document if it doesn't exist
                );
            }
        }
        console.log(`Successfully processed and stored gyms for location (${lat}, ${lng}).`);
    }
    catch (error) {
        console.error("Error in fetching gyms from Places API", error);
        throw error;
    }
});
exports.fetchGymsFromGoogle = fetchGymsFromGoogle;
// Function to retrieve gyms from the database within a given radius:
const getGyms = (lat, lng, radius) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // MongoDB geospatial query to find gyms within the given radius:
        const gyms = yield Gym_1.default.find({
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
exports.getGyms = getGyms;
const longitude = 28.59963068377233;
const latitude = 77.08642935993626;
const searchRadius = 1000;
const temp = (0, exports.getGyms)(longitude, latitude, searchRadius);
console.log(temp);
