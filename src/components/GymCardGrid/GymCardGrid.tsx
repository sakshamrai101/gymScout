import React from "react";
import GymCard from "../GymCard/GymCard";
import "./GymCardGrid.css";

interface GymCardGridProps {
    gyms: any[];
}

const GymCardGrid: React.FC<GymCardGridProps> = ({gyms}) => {
    return (
        <div className="gym-card-grid">
            {gyms.map((gym, index) => (
                <GymCard
                    key={index}
                    name={gym.name}
                    address={gym.address}
                    distance={gym.distance || 0}
                    rating={gym.rating || 0}
                    review={gym.totalRatings ? `${gym.totalRatings} ratings` : "No reviews"}
                />
            ))}
        </div>
    );
};

export default GymCardGrid;
