import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import "./FilterBox.css";

interface FilterProps {
    onSetFilters: (radius: number, rating: number) => void; // Pass radius and rating to the parent
}

const FilterBox: React.FC<FilterProps> = ({ onSetFilters }) => {
    const [radius, setRadius] = useState(1);
    const [rating, setRating] = useState(1);

    const handleSetFilters = () => {
        console.log("Filters applied:", { radius, rating });
        onSetFilters(radius, rating); // Send radius and rating to parent
    };

    return (
        <div className="filter-box">
            <h3>Filter Options</h3>
            <label>
                Radius (in miles): {radius} mi
                <input
                    type="range"
                    min="1"
                    max="5"
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                />
            </label>


            <label className="price-filter">
                Price ($): <FaLock className="lock-icon" />
                <input type="range" min="0" max="100" disabled />
                <span className="pro-feature">Unlock with Pro</span>
            </label>

            <button className="set-filters-btn" onClick={handleSetFilters}>
                Set Filters
            </button>
        </div>
    );
};

export default FilterBox;
