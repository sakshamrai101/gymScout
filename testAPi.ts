import dotenv from "dotenv";
dotenv.config()
import axios from "axios";

const API = process.env.GOOGLE_MAPS_KEY

const testPlacesAPi = async () => {
    const lat = 28.5996230718505; // Static latitude for New Delhi
    const lng = 77.08643762581633;  // Static longitude for New Delhi
    const radius = 1000; // 1km radius
    console.log("API KEY", API);
    /*
    try {
        console.log(`Testing API call to Google Places for location (${lat}, ${lng}) and radius ${radius}`);
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
            {
                params: {
                    location: `${lat},${lng}`,
                    radius,
                    type: `gym`,
                    key: API,
                },
            }
        );
        console.log("Response from Google Places API:", response.data);

    } catch (error) {
        console.error("Error in API call:");
    }
*/
}
testPlacesAPi();
