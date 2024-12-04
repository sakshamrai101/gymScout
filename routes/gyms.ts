import express from 'express';
import type { Request, Response } from 'express';

const router = express.Router();


// Define the expected shape of the request body
interface LocationRequestBody {
    latitude: number;
    longitude: number;
}

// POST /api/gyms/nearby - Receive user's location
router.post(
    "/nearby",
    (req, res) => {
        const { latitude, longitude } = req.body as LocationRequestBody;

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
    }
);

export default router;
