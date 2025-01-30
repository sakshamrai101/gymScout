import React, { useState } from "react";
import axios from "axios";
import "./SearchBar.css";

// Use environment variable for API URL
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "https://gymscout.onrender.com";

interface SearchBarProps {
    onSearch: (lat: number, lng: number, radius: number) => void;
}

interface Suggestion {
    description: string;
    place_id: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [location, setLocation] = useState<string>("");
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const fixedRadius = 1000;  // Fixed search radius

    // Handle input changes and fetch suggestions from backend
    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocation(value);

        if (value.length > 2) {
            setLoading(true);
            try {
                // Call backend API instead of Google API directly
                const { data } = await axios.get(
                    `${API_BASE_URL}/api/gyms/autocomplete`,  // ✅ Updated API URL
                    {
                        params: { input: value },
                    }
                );

                setSuggestions(data.predictions || []);
            } catch (err) {
                console.error("Error fetching suggestions:", err);
            } finally {
                setLoading(false);
            }
        } else {
            setSuggestions([]);
        }
    };

    // Handle selecting a suggestion and fetching lat/lng
    const handleSelectSuggestion = async (placeId: string, description: string) => {
        setLoading(true);
        try {
            const { data } = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json`,
                {
                    params: {
                        place_id: placeId,
                        key: process.env.REACT_APP_GOOGLE_MAPS_KEY,  // Use environment variable
                    },
                }
            );

            const { lat, lng } = data.results[0].geometry.location;

            // Trigger search action with lat, lng, and fixed radius
            onSearch(lat, lng, fixedRadius);

            // Set input to selected location
            setLocation(description);

            // Clear suggestions after selection
            setSuggestions([]);
        } catch (err) {
            console.error("Error fetching location details:", err);
        } finally {
            setLoading(false);
        }
    };

    // Handle direct search without selecting a suggestion
    const handleManualSearch = async () => {
        if (!location.trim()) {
            alert("Please enter a valid location.");
            return;
        }

        setLoading(true);
        try {
            // Call Google Geocoding API to get lat/lng for manually entered location
            const { data } = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json`,
                {
                    params: {
                        address: location,
                        key: process.env.REACT_APP_GOOGLE_MAPS_KEY,  // Use environment variable
                    },
                }
            );

            if (data.status === "OK") {
                const { lat, lng } = data.results[0].geometry.location;
                console.log(`Location found: ${lat}, ${lng}`);

                // Trigger search action with lat, lng, and fixed radius
                onSearch(lat, lng, fixedRadius);
            } else {
                alert("Location not found. Please enter a valid address.");
            }
        } catch (error) {
            console.error("Error fetching location details:", error);
            alert("Failed to get location details. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Enter your location"
                className="search-input"
                value={location}
                onChange={handleInputChange}
            />
            {loading && <div className="loading">Loading...</div>}
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.place_id}
                            onClick={() => handleSelectSuggestion(suggestion.place_id, suggestion.description)}
                        >
                            {suggestion.description}
                        </li>
                    ))}
                </ul>
            )}
            <button
                className="search-button"
                onClick={handleManualSearch}
                disabled={loading}
            >
                {loading ? "Searching..." : "Search"}
            </button>
        </div>
    );
};

export default SearchBar;
