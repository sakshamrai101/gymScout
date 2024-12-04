import mongoose from "mongoose";
import { Schema, Document } from "mongoose";

// An interface to define gym entities:
export interface IGym extends Document {
    name: string;
    location: {lat: number; lng: number};
    address: string;
    priceRange?: {min: number; max: number};  // optional, might not exist 
    socialMedia?: {instagram?: string; facebook?: string; website?: string};
    reviews?: {rating: number; comment: string}[];
}

// Actual schema, based on above structure:
const GymSchema: Schema = new Schema ({
    name: {type: String, required: true},
    location: {
        lat: {type: Number, required: true},
        lng: {type: Number, required: true},
    },
    address: {type: String, required: true},
    priceRange: {
        min: {type: Number},
        max: {type: Number},
    },
    socialMedia: {
        instagram: {type: String},
        facebook: {type: String},
        website: {type: String},
    },
    reviews: [
        {
            rating: {type: String, required: true, min: 1, max: 5},
            comments: {type: String},
        },
    ],
}, {timestamps: true});

export default mongoose.model<IGym>("Gym", GymSchema);