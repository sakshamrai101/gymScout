import axios from "axios";

// Function to scrape nearby gym data using OpenStreetMap Overpass API
const scrapeOpenStreetMap = async (latitude: number, longitude: number, radius: number = 10000) => {
    try {
        // The Overpass API query
        const query = `
        [out:json]; 
        (
            node["leisure"](around:${radius},${latitude},${longitude});
            way["leisure"](around:${radius},${latitude},${longitude});
            relation["leisure"](around:${radius},${latitude},${longitude});
        );
        out body;
        >;
        out skel qt;
        `;
        console.log("Generated Query:\n", query);
        // Send this query to the OpenStreetMap API
        const response = await axios.post("https://overpass-api.de/api/interpreter", query, {
            headers: { "Content-Type": "text/plain" },
        });

        // Destructure and process the API response
        const gyms = response.data.elements // Assuming the API response has a field "elements" containing gym details
            .filter((element: any) => element.tags?.name) // Filter elements with a defined "name" under the tags property
            .map((element: any) => ({
                id: element.id,
                name: element.tags.name,
                latitude: element.lat || null,
                longitude: element.lon || null,
                address: element.tags["addr:street"]
                    ? `${element.tags["addr:street"]}, ${element.tags["addr:city"] || ""}, ${element.tags["addr:postcode"] || ""}`
                    : "Address not available",
                opening_hours: element.tags.opening_hours || "Hours not available",
                website: element.tags.website || "Website not available",
            }));

        return gyms;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error scraping OpenStreetMap:", error.message);
        } else if (error instanceof Error) {
            console.error("General error scraping OpenStreetMap:", error.message);
        } else {
            console.error("An unknown error occurred while scraping OpenStreetMap.");
        }
        throw new Error("Failed to fetch gym data from OpenStreetMap.");
    }
};

export default scrapeOpenStreetMap;
