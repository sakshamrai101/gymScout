import React from "react";
import "./GymCard.css";
const GymCard = ({ name, address, distance, rating, review }) => {
    return (React.createElement("div", { className: "gym-card" },
        React.createElement("h3", null, name),
        React.createElement("p", null, address),
        React.createElement("p", null,
            "Distance: ",
            distance,
            " miles"),
        React.createElement("p", null,
            "Rating: ",
            rating,
            "/5"),
        React.createElement("p", null, review),
        React.createElement("button", { className: "edit-button" }, "Leave Review")));
};
export default GymCard;
