import mongoose, { Schema, Document } from "mongoose";

// Define the structure of a Gym document
export interface IGym extends Document {
    name: string;
    address: string;
    location: {
        type: string;
        coordinates: [number, number]; // Correct coordinates array
    };
    rating: number;
    totalRatings: number; // Correct field name
    placeId: string;
    fetchedAt: Date;
    reviews: string[];
}

// Create schema for the MongoDB collection
const GymSchema = new Schema<IGym>({
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

export default mongoose.model<IGym>("Gym", GymSchema);
