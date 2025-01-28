import mongoose, { Schema, Document } from "mongoose";

export interface IGym extends Document {
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
}

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
    rating: { type: Number, required: true },
    totalRatings: { type: Number, required: true },
    placeId: { type: String, unique: true, required: true },
    fetchedAt: { type: Date, default: Date.now },
});

GymSchema.index({ location: "2dsphere" });

export default mongoose.model<IGym>("Gym", GymSchema);
