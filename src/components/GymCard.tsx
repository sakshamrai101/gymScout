// component to dislpay an individual gym card:
import React from "react";
import "./GymCard.css";

// Define the props to be passed onto the React component:
interface GymCardProps {
    name: string;
    address: string;
    distance: number;
    rating: number;
}

// Create the react component:
const GymCard: React.FC<GymCardProps> = ({name, address, distance, rating}) => (
    <div className="gym-card">
        <h3>{name}</h3>
        <p>{address}</p>
        <p>Distance: {distance} miles</p>
        <p>Rating: {rating}/5</p>
    </div>
);

export default GymCard
