"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
// Actual schema, based on above structure:
const GymSchema = new mongoose_2.Schema({
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
exports.default = mongoose_1.default.model("Gym", GymSchema);
