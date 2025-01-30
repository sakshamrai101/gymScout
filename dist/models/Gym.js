import mongoose, { Schema } from "mongoose";
// Schema for reviews
const ReviewSchema = new Schema({
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
// Schema for the MongoDB collection
const GymSchema = new Schema({
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
export default mongoose.model("Gym", GymSchema);
