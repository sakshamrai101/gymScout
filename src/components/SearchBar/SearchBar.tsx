import React from "react";
import "./SearchBar.css"

const SearchBar: React.FC = () => {
    return (
        <div className="search-bar">
            <input
            type="text"
            placeholder="Enter your location"
            className="search-input">
            </input>
            <button className="search-button">
                Search
            </button>
        </div>
    );
};

export default SearchBar;