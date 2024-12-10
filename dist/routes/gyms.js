import express from "express";
const router = express.Router();
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
export default router;
