import React, { useState, useEffect } from "react";
import "./GymCard.css";
import ReviewPopUp from "../ReviewPopUp/ReviewPopUp";
import axios from "axios";

// Use the environment variable for API calls
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "https://gymscout.onrender.com";

interface GymCardProps {
    gymId: string;
    name: string;
    address: string;
    distance: number;
    rating: number;
    totalRatings: number;
}

const GymCard: React.FC<GymCardProps> = ({
    gymId,
    name,
    address,
    distance,
    rating,
    totalRatings: initialTotalRatings,
}) => {
    const [updatedRating, setUpdatedRating] = useState<number>(rating);
    const [totalRatings, setTotalRatings] = useState<number>(initialTotalRatings);
    const [latestReview, setLatestReview] = useState<string>("");
    const [reviews, setReviews] = useState<{ rating: number; comment: string }[]>([]);
    const [showReviewPopup, setShowReviewPopup] = useState(false);

    // Fetch latest gym data and reviews
    const fetchUpdatedGymData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/gyms/${gymId}`);
            if (response.status === 200) {
                setUpdatedRating(response.data.gym.rating);
                setTotalRatings(response.data.gym.totalRatings);
                setReviews(response.data.gym.reviews || []);
                setLatestReview(
                    response.data.gym.reviews.length > 0
                        ? response.data.gym.reviews[response.data.gym.reviews.length - 1].comment
                        : "No reviews yet"
                );
            }
        } catch (error) {
            console.error("Error fetching updated gym data:", error);
        }
    };

    // Fetch reviews on mount
    useEffect(() => {
        fetchUpdatedGymData();
    }, []);

    // Handles review submission
    const handleReviewSubmit = async (newRating: number, newReview: string) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/gyms/${gymId}/review`, {
                rating: newRating,
                comment: newReview,
            });

            if (response.status === 200) {
                console.log("Review submitted successfully!");
                fetchUpdatedGymData(); // Refresh data after submission
            } else {
                alert("Failed to submit review. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Failed to submit review. Please try again.");
        }

        setShowReviewPopup(false);
    };

    return (
        <>
            <div className="gym-card">
                <div className="gym-card-header">
                    <h3 className="gym-name">🏋️ {name}</h3>
                    <p className="gym-card-rating">⭐ {updatedRating.toFixed(1)}/5</p>
                </div>
                <p className="gym-address">📍 {address}</p>
                <p className="gym-card-distance">📏 {distance.toFixed(2)} miles away</p>
                <p className="gym-card-total-ratings">
                    Ratings: <span>{totalRatings}</span>
                </p>

                {/* Reviews Section */}
                <div className="gym-reviews">
                    <h4>Reviews:</h4>
                    {reviews.length > 0 ? (
                        <ul className="review-list">
                            {reviews.slice(0, 50).map((review, index) => (
                                <li key={index} className="gym-review-item">
                                    ⭐ {review.rating}/5 - "{review.comment}"
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-reviews">No reviews yet, be the first one to leave one!</p>
                    )}
                </div>

                <button className="leave-review-button" onClick={() => setShowReviewPopup(true)}>
                    Leave a Review
                </button>
            </div>

            {showReviewPopup && (
                <ReviewPopUp
                    gymId={gymId}
                    onClose={() => setShowReviewPopup(false)}
                    onSubmit={handleReviewSubmit}
                />
            )}
        </>
    );
};

export default GymCard;
