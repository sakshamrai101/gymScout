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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGyms = exports.fetchGymsFromGoogle = void 0;
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var axios_1 = require("axios"); // for making HTTP requests
var Gym_1 = require("../models/Gym"); // to interact with the MongoDB model
var db_1 = require("../config/db");
var API = process.env.GOOGLE_MAPS_KEY;
// Function to fetch gyms using Google's Places API:
var fetchGymsFromGoogle = function (lat, lng, radius) { return __awaiter(void 0, void 0, void 0, function () {
    var response, gyms, _i, gyms_1, gym, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                return [4 /*yield*/, (0, db_1.default)()];
            case 1:
                _a.sent();
                return [4 /*yield*/, axios_1.default.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", {
                        params: {
                            location: "".concat(lat, ",").concat(lng),
                            radius: radius,
                            type: "gym",
                            key: API,
                        },
                    })];
            case 2:
                response = _a.sent();
                gyms = response.data.results;
                console.log(gyms.length);
                _i = 0, gyms_1 = gyms;
                _a.label = 3;
            case 3:
                if (!(_i < gyms_1.length)) return [3 /*break*/, 6];
                gym = gyms_1[_i];
                if (!(gym.business_status === "OPERATIONAL")) return [3 /*break*/, 5];
                return [4 /*yield*/, Gym_1.default.findOneAndUpdate({ placeId: gym.place_id }, // Match by unique Place ID
                    {
                        name: gym.name,
                        address: gym.vicinity || "Address not available",
                        location: {
                            type: "Point",
                            coordinates: [gym.geometry.location.lng, gym.geometry.location.lat], // [lng, lat]
                        },
                        rating: gym.rating || 0,
                        totalRatings: gym.user_ratings_total || 0, // Correct field name
                        placeId: gym.place_id,
                        fetchedAt: new Date(),
                    }, { upsert: true, new: true } // Create new document if it doesn't exist
                    )];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6:
                console.log("Successfully processed and stored gyms for location (".concat(lat, ", ").concat(lng, ")."));
                return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                console.error("Error in fetching gyms from Places API", error_1);
                throw error_1;
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.fetchGymsFromGoogle = fetchGymsFromGoogle;
// Function to retrieve gyms from the database within a given radius:
var getGyms = function (lat, lng, radius) { return __awaiter(void 0, void 0, void 0, function () {
    var gyms, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Gym_1.default.find({
                        location: {
                            $near: {
                                $geometry: {
                                    type: "Point",
                                    coordinates: [lng, lat], // Note: [longitude, latitude]
                                },
                                $maxDistance: radius, // Radius in meters
                            },
                        },
                    }).select("name address location rating totalRatings")];
            case 1:
                gyms = _a.sent();
                console.log("Found ".concat(gyms.length, " gyms near (").concat(lat, ", ").concat(lng, ") within ").concat(radius, " meters."));
                return [2 /*return*/, gyms];
            case 2:
                error_2 = _a.sent();
                console.error("Error in fetching gyms from the database", error_2);
                throw error_2;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getGyms = getGyms;
// Main function to test the services:
/*
(async () => {
    try {
        await connectDB();

        // Test fetching gyms from database
        const latitude = 28.59963068377233;
        const longitude = 77.08642935993626;
        const radius = 10000;

        const gyms = await getGyms(latitude, longitude, radius);
        connection.close();
        console.log("Gyms:", gyms);
    } catch (err) {
        console.error("Error:", err);
    }
})();

*/
