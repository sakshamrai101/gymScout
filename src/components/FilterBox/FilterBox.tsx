import React from "react";
import "./FilterBox.css";

const FilterBox: React.FC = () => {
    return (
        <div className="filter-box">
            <h3>Filter Options</h3>
            <label>
                Radius (in miles):
                <input type="range" min="1" max="5" />
            </label>
            <label>
                Price ($):
                <input type="range" min="0" max="100" />
            </label>
            <label>
                Rating:
                <input type="range" min="1" max="5" />
            </label>
        </div>
    );
};

export default FilterBox;