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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const GooglePlacesService_1 = require("./utils/GooglePlacesService");
const db_1 = __importDefault(require("./config/db"));
// Array of cities with [latitude, longitude]
const locations = [
    [28.6139, 77.2090], // Delhi
    [19.0760, 72.8777], // Mumbai
    [13.0827, 80.2707], // Chennai
    [12.9716, 77.5946], // Bangalore
    [22.5726, 88.3639], // Kolkata
    [40.7128, -74.0060], // New York
    [34.0522, -118.2437], // Los Angeles
    [41.8781, -87.6298], // Chicago
    [29.7604, -95.3698], // Houston
    [37.7749, -122.4194], // San Francisco
];
const RADIUS = 10000; // Search radius in meters (10 km)
// Prepopulate gyms into the database
const prepopulateGyms = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.default)(); // Connect to MongoDB
    for (const [lat, lng] of locations) {
        console.log(`Fetching gyms for location (${lat}, ${lng})...`);
        yield (0, GooglePlacesService_1.fetchGymsFromGoogle)(lat, lng, RADIUS);
    }
    console.log("Prepopulation complete.");
    mongoose_1.default.connection.close(); // Close connection
});
prepopulateGyms();
