import React from "react";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import GymCardGrid from "../GymCardGrid/GymCardGrid";
import FilterBox from "../FilterBox/FilterBox";
import Footer from "../Footer/Footer";
import "./LandingPage.css";
const LandingPage = () => {
    return (React.createElement("div", { className: "landing-page" },
        React.createElement(Header, null),
        React.createElement("div", { className: "search-section" },
            React.createElement(SearchBar, null),
            React.createElement(FilterBox, null)),
        React.createElement(GymCardGrid, null),
        React.createElement(Footer, null)));
};
export default LandingPage;
