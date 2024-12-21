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
const express_1 = __importDefault(require("express"));
const GooglePlacesService_1 = require("../utils/GooglePlacesService");
const router = express_1.default.Router();
// Route for fetching gyms:
router.get("/nearby", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lat, lng, radius } = req.query;
    // validate the parameters:
    if (!lat || !lng || !radius) {
        return res.status(400).json({ message: "lat, lng, and radius are required." });
    }
    try {
        const longitude = 28.59963068377233;
        const latitude = 77.08642935993626;
        const searchRadius = 1000;
        // check for exisitng gyms in the db:
        let gyms = yield (0, GooglePlacesService_1.getGyms)(latitude, longitude, searchRadius);
        console.log(gyms);
        if (gyms.length == 0) {
            // if no gyms are returned, call the api service to Google Places and store results in db:
            (0, GooglePlacesService_1.fetchGymsFromGoogle)(latitude, longitude, searchRadius);
            gyms = yield (0, GooglePlacesService_1.getGyms)(latitude, longitude, searchRadius);
        }
        res.status(200).json({ gyms, source: gyms.length ? "databse" : "google_places" });
    }
    catch (error) {
        console.log("Error in /nearby route:", error);
        res.status(500).json({ message: "internal server error" });
    }
}));
exports.default = router;
