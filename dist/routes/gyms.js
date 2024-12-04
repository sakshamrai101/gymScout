"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// POST /api/gyms/nearby - Receive user's location
router.post("/nearby", (req, res) => {
    const { latitude, longitude } = req.body;
    // Validate latitude and longitude
    if (latitude === undefined || longitude === undefined) {
        return res
            .status(400)
            .json({ message: "Latitude and longitude are required." });
    }
    console.log("Received Location:", { latitude, longitude });
    return res.status(200).json({
        message: "Location received successfully.",
        latitude,
        longitude,
    });
});
exports.default = router;
