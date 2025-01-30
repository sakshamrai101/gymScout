import React, { useState } from "react";
import "./ReviewPopUp.css";
const ReviewPopUp = ({ onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const handleSubmit = () => {
        if (comment.trim() && rating > 0) {
            onSubmit(rating, comment);
            onClose();
        }
        else {
            alert("Please provide a rating and a review comment.");
        }
    };
    return (React.createElement("div", { className: "popup-overlay" },
        React.createElement("div", { className: "popup-content" },
            React.createElement("h2", null, "Leave a Review"),
            React.createElement("div", { className: "star-rating" }, [1, 2, 3, 4, 5].map((star) => (React.createElement("span", { key: star, className: `star ${star <= (hoverRating || rating) ? "filled" : ""}`, onMouseEnter: () => setHoverRating(star), onMouseLeave: () => setHoverRating(0), onClick: () => setRating(star) }, "\u2605")))),
            React.createElement("p", { className: "rating-label" }, rating > 0 ? `${rating} / 5` : "No rating selected"),
            React.createElement("textarea", { placeholder: "Write your review here...", value: comment, onChange: (e) => setComment(e.target.value) }),
            React.createElement("div", { className: "button-group" },
                React.createElement("button", { onClick: handleSubmit, className: "submit-button" }, "Submit"),
                React.createElement("button", { onClick: onClose, className: "cancel-button" }, "Cancel")))));
};
export default ReviewPopUp;
