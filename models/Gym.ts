import mongoose, { Schema, Document } from "mongoose"; // Interacting with db and creating db structure 


// defining structure a particular gym document
export interface IGym extends Document {
    name: string;
    address: string;
    location: {
        type: string 
        cooirdinates: [number, number];
    };
    rating: number;
    total_ratings: number;
    placeId: string;
    fetchedAt: Date;
    reviews: [rvs: string];
}

// creating schema for the mongoDB collection:
const GymSchema = new Schema<IGym>({
    name: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        type: { 
            type: String, 
            enum: ["Point"],
            required: true 
        },
        cooirdinates: { 
            type: [Number], // Array of no.s representing [latitude, longitude]
            required: true 
        },
    },
    rating: { type: Number, required: true },
    total_ratings: { type: Number, required: true },
    placeId: { type: String, unique: true, required: true },
    fetchedAt: { type: Date, default: Date.now },
    reviews: {type: [String], defualt: [] },
});

// geospatial index for the location field 
GymSchema.index({ location: "2dsphere"});

export default mongoose.model<IGym>('Gym', GymSchema);