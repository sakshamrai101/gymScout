"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// Create schema for the MongoDB collection
var GymSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        type: {
            type: String,
            enum: ["Point"], // Enforce GeoJSON Point type
            required: true,
        },
        coordinates: {
            type: [Number], // Array of numbers representing [longitude, latitude]
            required: true,
        },
    },
    rating: { type: Number, default: 0 }, // Default rating to 0
    totalRatings: { type: Number, default: 0 }, // Default totalRatings to 0
    placeId: { type: String, unique: true, required: true },
    fetchedAt: { type: Date, default: Date.now },
    reviews: { type: [String], default: [] },
});
// Add a geospatial index for location
GymSchema.index({ location: "2dsphere" });
exports.default = mongoose_1.default.model("Gym", GymSchema);
