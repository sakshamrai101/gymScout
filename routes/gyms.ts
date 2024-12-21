import express from "express";
import { fetchGymsFromGoogle, getGyms } from "../utils/GooglePlacesService";

const router = express.Router();

// Route for fetching gyms:
router.get("/nearby", async(req, res) => {
    const {lat, lng, radius} = req.query;


    // validate the parameters:
    if (!lat || !lng || !radius) {
        return res.status(400).json({ message: "lat, lng, and radius are required." });
    }

    try {
        const longitude = 28.59963068377233;
        const latitude = 77.08642935993626;
        const searchRadius = 1000;


        // check for exisitng gyms in the db:
        let gyms = await getGyms(latitude, longitude, searchRadius);
        console.log(gyms)


        if (gyms.length == 0) {
            // if no gyms are returned, call the api service to Google Places and store results in db:
            fetchGymsFromGoogle(latitude, longitude, searchRadius);
            gyms = await getGyms(latitude, longitude, searchRadius);
        }

        res.status(200).json({gyms, source: gyms.length ? "databse" : "google_places"});
    } catch(error) {
        console.log("Error in /nearby route:", error);
        res.status(500).json({message: "internal server error"});
    }
});

export default router;