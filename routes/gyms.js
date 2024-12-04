"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.default.Router();
// POST /api/gyms/nearby - Receive user's location
router.post("/nearby", function (req, res) {
    var _a = req.body, latitude = _a.latitude, longitude = _a.longitude;
    // Validate latitude and longitude
    if (latitude === undefined || longitude === undefined) {
        return res
            .status(400)
            .json({ message: "Latitude and longitude are required." });
    }
    console.log("Received Location:", { latitude: latitude, longitude: longitude });
    return res.status(200).json({
        message: "Location received successfully.",
        latitude: latitude,
        longitude: longitude,
    });
});
exports.default = router;
