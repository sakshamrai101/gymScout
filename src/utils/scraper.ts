
// mock fn to return hardcoded data to test front-end functionality:
const fetchGyms = async (page: number, limit: number) => {

    // Simulating real api call delay 
    await new Promise((resolve) => setTimeout(resolve, 500));


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
};

export default fetchGyms;