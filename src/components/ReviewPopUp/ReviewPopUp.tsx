import React, { useState } from "react";
import "./ReviewPopUp.css";

interface ReviewPopUpProps {
    onClose: () => void;
    onSubmit: (rating: number, comments: string) => void;
}

const ReviewPopUp: React.FC<ReviewPopUpProps> = ({onClose, onSubmit}) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");


    const handleSubmit = () => {
        if (comment.trim() && rating > 0) {
            onSubmit(rating, comment);
            onClose();
        } else {
            alert("Please provide a rating and a review comment.");
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Leave a Review</h2>
                {/* Star Rating Section */}
                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`star ${star <= (hoverRating || rating) ? "filled" : ""}`}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                        >
                            ★
                        </span>
                    ))}
                </div>

                {/* Display current rating */}
                <p className="rating-label">{rating > 0 ? `${rating} / 5` : "No rating selected"}</p>

                {/* Review Textarea */}
                <textarea
                    placeholder="Write your review here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />

                {/* Action Buttons */}
                <div className="button-group">
                    <button onClick={handleSubmit} className="submit-button">
                        Submit
                    </button>
                    <button onClick={onClose} className="cancel-button">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewPopUp;