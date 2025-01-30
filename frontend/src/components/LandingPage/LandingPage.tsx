import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import GymCardGrid from "../GymCardGrid/GymCardGrid";
import Footer from "../Footer/Footer";
import FilterBox from "../FilterBox/FilterBox";
import axios from "axios";
import { IGym } from "../../../backend/models/Gym";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
    const [gyms, setGyms] = useState<IGym[]>([]); // Stores all gyms fetched from the backend
    const [currentGyms, setCurrentGyms] = useState<IGym[]>([]); // Stores gyms for the current page
    const [radius, setRadius] = useState(1); // Radius in miles
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const gymsPerPage = 10; // Number of gyms per page

    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

    // Fetch gyms for the given radius, location, and rating
    const fetchGyms = async (lat: number, lng: number, newRadius: number, minRating: number) => {
        try {
            console.log(
                `Fetching gyms near lat: ${lat}, lng: ${lng}, radius: ${newRadius}, minRating: ${minRating}`
            );

            const response = await axios.get("http://localhost:5001/api/gyms/nearby", {
                params: {
                    lat,
                    lng,
                    radius: newRadius * 1609.34, // Convert miles to meters
                    rating: minRating, // Include rating in the query
                    limit: 50,
                },
            });

            if (response.data && response.data.gyms) {
                // ✅ Ensure `_id` is a string and `distance` is set as a number
                const gymsWithFixes: IGym[] = response.data.gyms.map((gym: IGym & { _id: any }) => ({
                    ...gym,
                    _id: gym._id.toString(), // ✅ Convert `_id` to string to avoid type errors
                    distance: gym.distance ?? 0, // ✅ Ensure `distance` is always a number
                }));

                setGyms(gymsWithFixes);
                setCurrentPage(1);
            } else {
                alert("No gyms found in the given area.");
            }
        } catch (error) {
            console.error("Error fetching gyms:", error);
            alert("Failed to fetch gyms. Please try again.");
        }
    };

    // Handle the search button click
    const handleSearch = (lat: number, lng: number) => {
        setUserLocation({ lat, lng });
        fetchGyms(lat, lng, radius, 1); // Default rating of 1 (no filter applied)
    };

    // Handle the set filters button click
    const handleSetFilters = (newRadius: number, minRating: number) => {
        setRadius(newRadius);
        if (userLocation) {
            const { lat, lng } = userLocation;
            fetchGyms(lat, lng, newRadius, minRating); // Fetch gyms with updated filters
        } else {
            console.error("User location not set.");
            alert("Please search for a location first.");
        }
    };

    // Update the current gyms based on pagination
    const paginateGyms = () => {
        const indexOfLastGym = currentPage * gymsPerPage;
        const indexOfFirstGym = indexOfLastGym - gymsPerPage;
        setCurrentGyms(gyms.slice(indexOfFirstGym, indexOfLastGym));
    };

    // Recalculate current gyms whenever gyms or current page changes
    useEffect(() => {
        paginateGyms();
    }, [gyms, currentPage]);

    return (
        <div className="landing-page">
            <Header />
            <div className="search-section">
                <SearchBar onSearch={handleSearch} />
                <FilterBox onSetFilters={(radius, rating) => handleSetFilters(radius, rating)} />
            </div>
            <GymCardGrid gyms={currentGyms} />
            {/* Pagination Controls */}
            <div className="pagination">
                {Array.from({ length: Math.ceil(gyms.length / gymsPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={currentPage === index + 1 ? "active-page" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default LandingPage;
