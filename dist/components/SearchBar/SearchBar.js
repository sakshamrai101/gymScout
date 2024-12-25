import React from "react";
import "./SearchBar.css";
const SearchBar = () => {
    return (React.createElement("div", { className: "search-bar" },
        React.createElement("input", { type: "text", placeholder: "Enter your location", className: "search-input" }),
        React.createElement("button", { className: "search-button" }, "Search")));
};
export default SearchBar;
