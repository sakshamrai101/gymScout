import React from "react";
import "./GymCardGrid.css";
import GymCard from "../GymCard/GymCard";
// Mock data to be displayed:
const data = [
    { name: "Pro Ultimate Gym", address: "Mahavir Enclave", distance: 2, rating: 4, review: "nice gym, good atmosphere" },
    { name: "Power Gym", address: "456 Elm St", distance: 3.5, rating: 5, review: "nice gym, good girls" },
    { name: "Wellness Center", address: "789 Oak St", distance: 5, rating: 3.5, review: "nice gym, good equipment" },
    { name: "Wellness Center", address: "789 Oak St", distance: 5, rating: 3.5, review: "nice gym, good equipment" },
    { name: "Wellness Center", address: "789 Oak St", distance: 5, rating: 3.5, review: "nice gym, good equipment" }
];
const GymCardGrid = () => {
    return (React.createElement("div", { className: "gym-card-grid" }, data.map((gym, index) => (React.createElement(GymCard, Object.assign({ key: index }, gym))))));
};
export default GymCardGrid;
