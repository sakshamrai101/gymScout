import axios from "axios"; // for making http requests 
import Gym from "../models/Gym"; // to interact with the mongodb model

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const CACHE_EXPIRY_HOURS = Number(process.env.CACHE_EXPIRY_HOURS || 24);

// fn to send the api call to fetch gyms from using G's places API:
export const fetchGymsFromGoogle = async(lat: number, lng: number, radius: number): Promise<void> => {
    try {
        // make the api call to the places api:
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
            {
                params: {
                    location: `{lat}, {lng}`,
                    radius,
                    type: `gym`,
                    key: GOOGLE_MAPS_API_KEY,
                },
            }
        );

        // get the results from the api call:
        const gyms = response.data.results; // returns an array of gym data 


        // process and store the gym data in the database:
        for (const gym of gyms) { // for each gym document in gyms array
            
            await Gym.findOneAndUpdate( // mongodb fn to check if the same gym document exists in the db
                {placeId: gym.place_id}, // if there is a matching gym with the same id, update all its data
                {
                    name: gym.name,
                    address: gym.vicinty || "Address not available",
                    location: {
                        type: "Point",
                        coordinates: [gym.geometry.location.lng, gym.geometry.location.lat], // Note [lng, lat]
                    },
                    rating: gym.rating || 0,
                    total_ratings: gym.user_rating_total || 0,
                    placeId: gym.place_id,
                    fetchedAt: new Date(),
                },
                {upsert: true} // if not, just create a new document for the current gym with given data 
            );
        }

    } catch(error) {
        console.error("Error in fetching gyms from Places Api", error);
        throw error;
    }
};


// This fn retrieves gyms from the db that are within the given radius. 
export const getGyms = async (lat: number, lng: number, radius: number) => {
    try {

        // Mongodb geospatial query to get gyms within the given radius:
        const gyms = await Gym.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, lat]
                    },
                    $maxDistance: radius,
                },
            },
        });
        return gyms;

    } catch(error) {
        console.error("Error in fetching gyms from the db", error);
        throw error;
    }
};




