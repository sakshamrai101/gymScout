var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dotenv from "dotenv";
dotenv.config();
const API = process.env.GOOGLE_MAPS_KEY;
const testPlacesAPi = () => __awaiter(void 0, void 0, void 0, function* () {
    const lat = 28.5996230718505; // Static latitude for New Delhi
    const lng = 77.08643762581633; // Static longitude for New Delhi
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
});
testPlacesAPi();
