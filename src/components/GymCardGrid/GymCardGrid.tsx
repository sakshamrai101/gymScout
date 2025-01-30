import React from "react";
import GymCard from "../GymCard/GymCard";
import "./GymCardGrid.css";

interface GymCardGridProps {
    gyms: {
        _id: string;
        name: string;
        address: string;
        distance: number;
        rating: number;
        totalRatings: number;
    }[];
}

const GymCardGrid: React.FC<GymCardGridProps> = ({ gyms }) => {
    return (
        <div className="gym-card-grid">
            {gyms.map((gym) => (
                <GymCard
                    key={gym._id}
                    gymId={gym._id}
                    name={gym.name}
                    address={gym.address}
                    distance={gym.distance ?? 0} // ✅ Ensure `distance` is always a number
                    rating={gym.rating}
                    review={gym.totalRatings ? `${gym.totalRatings} ratings` : "No reviews"}
                />
            ))}
        </div>
    );
};

export default GymCardGrid;
