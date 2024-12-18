import React from "react";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import GymCardGrid from "../GymCardGrid/GymCardGrid";
import FilterBox from "../FilterBox/FilterBox";
import Footer from "../Footer/Footer";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
    return(
        <div className="landing-page">
            <Header />
            <div className="search-section">
                <SearchBar />
                <FilterBox />
            </div>
            <GymCardGrid />
            <Footer />
        </div>
    );
};

export default LandingPage;
