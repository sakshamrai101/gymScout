// component to dislpay an individual gym card:
import React from "react";
import "./GymCard.css";
// Create the react component:
const GymCard = ({ name, address, distance, rating }) => (React.createElement("div", { className: "gym-card" },
    React.createElement("h3", null, name),
    React.createElement("p", null, address),
    React.createElement("p", null,
        "Distance: ",
        distance,
        " miles"),
    React.createElement("p", null,
        "Rating: ",
        rating,
        "/5")));
export default GymCard;
