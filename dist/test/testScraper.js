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
const scraper_1 = __importDefault(require("../utils/scraper"));
// Create a testing function to test the functionality of the scraper:
const testScraper = () => __awaiter(void 0, void 0, void 0, function* () {
    const longitude = 40.7128;
    const latitude = -74.0060;
    const radius = 10000;
    try {
        console.log('Testing OpenStreetMap Scraper ....');
        const gyms = yield (0, scraper_1.default)(latitude, longitude, radius);
        console.log("Here are the nearby gyms: ", gyms);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Error during scraping: ", error.message);
        }
        else {
            console.log("An unkown error occurred.");
        }
    }
});
testScraper();
