import scrapeOpenStreetMap from "../utils/scraper";

// Create a testing function to test the functionality of the scraper:
const testScraper = async () => {
    const longitude = 40.7128;
    const latitude = -74.0060;
    const radius  = 10000;

    try {
        console.log('Testing OpenStreetMap Scraper ....');
        const gyms = await scrapeOpenStreetMap(latitude, longitude, radius);
        console.log("Here are the nearby gyms: ", gyms);
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Error during scraping: ", error.message);
        } else {
            console.log("An unkown error occurred.");
        }
    }
};

testScraper();