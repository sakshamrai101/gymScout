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
    [28.5904, 77.0430], // North Delhi
];
const RADIUS = 1000; // Search radius in meters (100 km)
// Prepopulate gyms into the database
const prepopulateGyms = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)(); // Connect to MongoDB
        for (const [lat, lng] of locations) {
            console.log(`Fetching gyms for location (${lat}, ${lng})...`);
            try {
                yield (0, GooglePlacesService_1.fetchGymsFromGoogle)(lat, lng, RADIUS);
            }
            catch (fetchError) {
                console.error(`Error fetching gyms for (${lat}, ${lng}):`, fetchError);
            }
        }
        console.log("Prepopulation complete.");
    }
    catch (error) {
        console.error("Error during prepopulation:", error);
    }
    finally {
        // Close the connection after all operations are complete
        mongoose_1.default.connection.close();
        console.log("MongoDB connection closed.");
    }
});
prepopulateGyms();
