import mongoose from "mongoose";
import { Schema } from "mongoose";
// Actual schema, based on above structure:
const GymSchema = new Schema({
    name: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    address: { type: String, required: true },
    priceRange: {
        min: { type: Number },
        max: { type: Number },
    },
    socialMedia: {
        instagram: { type: String },
        facebook: { type: String },
        website: { type: String },
    },
    reviews: [
        {
            rating: { type: String, required: true, min: 1, max: 5 },
            comments: { type: String },
        },
    ],
}, { timestamps: true });
export default mongoose.model("Gym", GymSchema);
