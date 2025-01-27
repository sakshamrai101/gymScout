import React, { useState } from "react";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import GymCardGrid from "../GymCardGrid/GymCardGrid";
import Footer from "../Footer/Footer";
import "./LandingPage.css";
import FilterBox from "../FilterBox/FilterBox";
import axios from "axios";

const LandingPage: React.FC = () => {
    const [gyms, setGyms] = useState([]);

    const handleSearch = async (lat: number, lng: number, radius: number) => {
        try {
            console.log(`Fetching gyms near lat: ${lat}, lng: ${lng}, radius: ${radius}`);

            const response = await axios.get("http://localhost:5001/api/gyms/nearby", {
                params: { lat, lng, radius },
            });

            if (response.data && response.data.gyms) {
                setGyms(response.data.gyms);
            } else {
                alert("No gyms found in the given area.");
            }
        } catch (error) {
            console.error("Error fetching gyms:", error);
            alert("Failed to fetch gyms. Please try again.");
        }
    };

    return (
        <div className="landing-page">
            <Header />
            <div className="search-section">
                <SearchBar onSearch={handleSearch} />
                <FilterBox />
            </div>
            <GymCardGrid gyms={gyms} />
            <Footer />
        </div>
    );
};

export default LandingPage;
