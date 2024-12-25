import React from "react";
import "./FilterBox.css";
const FilterBox = () => {
    return (React.createElement("div", { className: "filter-box" },
        React.createElement("h3", null, "Filter Options"),
        React.createElement("label", null,
            "Radius (in miles):",
            React.createElement("input", { type: "range", min: "1", max: "5" })),
        React.createElement("label", null,
            "Price ($):",
            React.createElement("input", { type: "range", min: "0", max: "100" })),
        React.createElement("label", null,
            "Rating:",
            React.createElement("input", { type: "range", min: "1", max: "5" }))));
};
export default FilterBox;
