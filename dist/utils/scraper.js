"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
// Function to scrape nearby gym data using OpenStreetMap Overpass API
const scrapeOpenStreetMap = (latitude_1, longitude_1, ...args_1) => __awaiter(void 0, [latitude_1, longitude_1, ...args_1], void 0, function* (latitude, longitude, radius = 10000) {
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
        const response = yield axios_1.default.post("https://overpass-api.de/api/interpreter", query, {
            headers: { "Content-Type": "text/plain" },
        });
        // Destructure and process the API response
        const gyms = response.data.elements // Assuming the API response has a field "elements" containing gym details
            .filter((element) => { var _a; return (_a = element.tags) === null || _a === void 0 ? void 0 : _a.name; }) // Filter elements with a defined "name" under the tags property
            .map((element) => ({
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
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error("Axios error scraping OpenStreetMap:", error.message);
        }
        else if (error instanceof Error) {
            console.error("General error scraping OpenStreetMap:", error.message);
        }
        else {
            console.error("An unknown error occurred while scraping OpenStreetMap.");
        }
        throw new Error("Failed to fetch gym data from OpenStreetMap.");
    }
});
exports.default = scrapeOpenStreetMap;
