import React, { useState } from "react";
import "./GymCard.css";
import ReviewPopUp from "../ReviewPopUp/ReviewPopUp";
import SuccessPopUp from "../SuccessPopUp/SuccessPopUp";

interface GymCardProps {
    name: string;
    address: string;
    distance: number;
    rating: number;
    review: string;
}

const GymCard: React.FC<GymCardProps> = ({ name, address, distance, rating, review }) => {
    const [showReviewPopup, setShowReviewPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleReviewSubmit = (newRating: number, comment: string) => {
        console.log(`Gym: ${name}`);
        console.log(`Rating: ${newRating}`);
        console.log(`Comment: ${comment}`);
        setShowReviewPopup(false);
        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false), 2000);
    };

    const handleReviewPopupOpen = () => {
        setShowReviewPopup(true);
    };

    const handleReviewPopupClose = () => {
        setShowReviewPopup(false);
    };

    return (
        <>
            <div className="gym-card">
                <div className="gym-card-header">
                    <h3>{name}</h3>
                    <p className="gym-card-rating">⭐ {rating}/5</p>
                </div>
                <p className="gym-card-address">{address}</p>
                <p className="gym-card-distance">📍 {distance.toFixed(2)} miles away</p>
                <p className="gym-card-review">"{review}"</p>
                <button className="leave-review-button" onClick={handleReviewPopupOpen}>
                    Leave a Review
                </button>
            </div>

            {showReviewPopup && (
                <ReviewPopUp onClose={handleReviewPopupClose} onSubmit={handleReviewSubmit} />
            )}

            {showSuccessPopup && <SuccessPopUp message="Thanks for your review!" />}
        </>
    );
};

export default GymCard;
