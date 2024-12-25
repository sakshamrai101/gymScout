import React, { useState } from "react";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import GymCardGrid from "../GymCardGrid/GymCardGrid";
import Footer from "../Footer/Footer";
import "./LandingPage.css";
import FilterBox from "../FilterBox/FilterBox";

const LandingPage: React.FC = () => {
    const [blurBackground, setBlurBackground] = useState(false);

    return (
        <div className={`landing-page ${blurBackground ? "blurred" : ""}`}>
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
