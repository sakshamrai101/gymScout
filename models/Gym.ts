import mongoose, { Schema, Document } from "mongoose";

// Define the structure of a Review
export interface IReview {
    rating: number;
    comment: string;
    createdAt: Date;
}

// Schema for reviews
const ReviewSchema = new Schema<IReview>({
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

// Define the structure of a Gym document
export interface IGym extends Document {
    _id: string; // ✅ Explicitly defined as a string to avoid TypeScript errors
    name: string;
    address: string;
    location: {
        type: string;
        coordinates: [number, number];
    };
    rating: number;
    totalRatings: number;
    placeId: string;
    fetchedAt: Date;
    reviews: IReview[];
    distance: number; // ✅ Ensures `distance` is required and always a number
}

// Schema for the MongoDB collection
const GymSchema = new Schema<IGym>({
    name: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    rating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
    placeId: { type: String, unique: true, required: true },
    fetchedAt: { type: Date, default: Date.now },
    reviews: { type: [ReviewSchema], default: [] },
    distance: { type: Number, default: 0 }, // ✅ Ensure distance is always stored as a number
});

// Geospatial index for location
GymSchema.index({ location: "2dsphere" });

export default mongoose.model<IGym>("Gym", GymSchema);
