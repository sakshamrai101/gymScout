import React from "react";
import GymCard from "../GymCard/GymCard";
import "./GymCardGrid.css";

// Mock data to be displayed:
const data = [
    { name: "Pro Ultimate Gym", address: "Mahavir Enclave", distance: 2, rating: 4, review: "Nice gym, good atmosphere" },
    { name: "Power Gym", address: "456 Elm St", distance: 3.5, rating: 5, review: "Nice gym, good girls" },
    { name: "Wellness Center", address: "789 Oak St", distance: 5, rating: 3.5, review: "Nice gym, good equipment" },
    { name: "Elite Gym", address: "123 Maple St", distance: 1.2, rating: 4.8, review: "Top-notch gym, great trainers" },
    { name: "Fitness Pro", address: "321 Birch St", distance: 4, rating: 4.2, review: "Great value for money" },
    { name: "Fitness Pro", address: "321 Birch St", distance: 4, rating: 4.2, review: "Great value for money" },
    { name: "Fitness Pro", address: "321 Birch St", distance: 4, rating: 4.2, review: "Great value for money" },
    { name: "Fitness Pro", address: "321 Birch St", distance: 4, rating: 4.2, review: "Great value for money" },
    { name: "Fitness Pro", address: "321 Birch St", distance: 4, rating: 4.2, review: "Great value for money" },
    { name: "Fitness Pro", address: "321 Birch St", distance: 4, rating: 4.2, review: "Great value for money" },
    { name: "Fitness Pro", address: "321 Birch St", distance: 4, rating: 4.2, review: "Great value for money" },
    { name: "Fitness Pro", address: "321 Birch St", distance: 4, rating: 4.2, review: "Great value for money" },
    { name: "Fitness Pro", address: "321 Birch St", distance: 4, rating: 4.2, review: "Great value for money" },
    { name: "Fitness Pro", address: "321 Birch St", distance: 4, rating: 4.2, review: "Great value for money" },
    { name: "Fitness Pro", address: "321 Birch St", distance: 4, rating: 4.2, review: "Great value for money" },
    { name: "Fitness Pro", address: "321 Birch St", distance: 4, rating: 4.2, review: "Great value for money" },
    { name: "Fitness Pro", address: "321 Birch St", distance: 4, rating: 4.2, review: "Great value for money" },
    { name: "Fitness Pro", address: "321 Birch St", distance: 4, rating: 4.2, review: "Great value for money" },
    { name: "Fitness Pro", address: "321 Birch St", distance: 4, rating: 4.2, review: "Great value for money" },
];

const GymCardGrid: React.FC = () => {
    return (
        <div className="gym-card-grid">
            {data.map((gym, index) => (
                <GymCard
                    key={index}
                    name={gym.name}
                    address={gym.address}
                    distance={gym.distance}
                    rating={gym.rating}
                    review={gym.review}
                />
            ))}
        </div>
    );
};

export default GymCardGrid;
