// ======================================
// ========== ReviewPopUp.tsx ===========
// ======================================
import React, { useState } from "react";
// CHANGED: Removed `axios` import—child no longer calls the API directly.
import "./ReviewPopUp.css";

// CHANGED: Renamed the prop to `onSubmit` 
// (instead of `onSubmitSuccess`).
interface ReviewPopUpProps {
    gymId: string;
    onClose: () => void;
    onSubmit: (rating: number, comment: string) => void;
}

const ReviewPopUp: React.FC<ReviewPopUpProps> = ({ gymId, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    // CHANGED: We can still use `loading` if we want to disable the button,
    // but now we don't do the API call here:
    const [submitting, setSubmitting] = useState(false);

    // CHANGED: The child no longer does axios.post;
    // it simply calls the parent's `onSubmit` prop.
    const handleSubmit = () => {
        if (comment.trim() === "" || rating === 0) {
            alert("Please provide a rating and a review comment.");
            return;
        }

        // Prevent double click if we like:
        if (submitting) return;
        setSubmitting(true);

        // CHANGED: Instead of doing an API call,
        // just pass the data up to the parent:
        onSubmit(rating, comment);

        // Optionally close or let the parent close the pop-up:
        onClose();
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Leave a Review</h2>
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

                <p className="rating-label">
                    {rating > 0 ? `${rating} / 5` : "No rating selected"}
                </p>

                <textarea
                    placeholder="Write your review here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />

                <div className="button-group">
                    <button
                        onClick={handleSubmit}
                        className="submit-button"
                        disabled={submitting}
                    >
                        {submitting ? "Submitting..." : "Submit"}
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
