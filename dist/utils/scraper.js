var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// mock fn to return hardcoded data to test front-end functionality:
const fetchGyms = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    // Simulating real api call delay 
    yield new Promise((resolve) => setTimeout(resolve, 500));
    // mock data to be returned:
    return {
        gyms: [
            {
                id: "1",
                name: "Iron Paradise Gym",
                address: "123 Fitness Street, Los Angeles, CA",
                opening_hours: "6:00 AM - 10:00 PM",
                latitude: 34.052235,
                longitude: -118.243683,
            },
            {
                id: "2",
                name: "Muscle Factory",
                address: "456 Strength Avenue, Los Angeles, CA",
                opening_hours: "5:00 AM - 11:00 PM",
                latitude: 34.052731,
                longitude: -118.244123,
            },
            {
                id: "3",
                name: "The Gym Hub",
                address: "789 Cardio Lane, Los Angeles, CA",
                opening_hours: "24/7",
                latitude: 34.053235,
                longitude: -118.243123,
            },
            {
                id: "4",
                name: "Body Power Fitness",
                address: "321 Weightlifting Blvd, Los Angeles, CA",
                opening_hours: "6:00 AM - 10:00 PM",
                latitude: 34.051123,
                longitude: -118.245234,
            },
        ],
        totalCount: 4, // Total gyms in the mock dataset
    };
});
export default fetchGyms;
