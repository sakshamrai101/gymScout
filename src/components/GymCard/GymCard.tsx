import React from "react";
import "./GymCard.css";



// mock props to be passed onto GymCard:
interface GymCardProps {
    name: string;
    address: string;
    distance: number;
    rating: number;
    review: string;
}
const GymCard: React.FC<GymCardProps> = ({name, address, distance, rating, review}) => {
    return (
        <div className="gym-card">
            <h3>{name}</h3>
            <p>{address}</p>
            <p>Distance: {distance} miles</p>
            <p>Rating: {rating}/5</p>
            <p>{review}</p>
            <button className="edit-button">
                Leave Review
            </button>
        </div>
    );
};

export default GymCard;