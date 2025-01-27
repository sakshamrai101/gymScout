var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import Gym from "../models/Gym.js";
const router = express.Router();
// POST route to add a review for a gym
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gymId, rating, comment } = req.body;
    if (!gymId || !rating || !comment) {
        return res.status(400).json({ message: "Gym ID, rating, and comment are required." });
    }
    try {
        const gym = yield Gym.findById(gymId);
        if (!gym) {
            return res.status(404).json({ message: "Gym not found." });
        }
        // Add new review with required fields
        gym.reviews.unshift({
            rating,
            comment,
            createdAt: new Date(), // Ensure createdAt is included
        });
        // Recalculate the average rating
        const totalReviews = gym.reviews.length;
        const totalRating = gym.reviews.reduce((sum, review) => sum + review.rating, 0);
        gym.rating = totalRating / totalReviews;
        gym.totalRatings = totalReviews;
        yield gym.save();
        res.status(200).json({ message: "Review added successfully.", gym });
    }
    catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}));
export default router;
