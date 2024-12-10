import React from "react";
import { useState, useEffect } from "react";
import "../styles/HomePage.css";
import fetchGyms from "../utils/scraper";

// component for displaying individual gym card:
const GymCard = ({name, address} : {name: string, address: string}) => (
    <div className="gym-card">
        <h3>{name}</h3>
        <p>{address}</p>
    </div>
);

const HomePage: React.FC = () => {
    const[gyms, setGyms] = useState<any[]>([]);
    const[page, setPage] = useState(1);
    const[hasMore, setHasMore] = useState(true);
    const ITEMS_PER_PAGE = 8;


    useEffect(() => {
        const loadGyms = async() => {
            try {
                const data = await fetchGyms(page, ITEMS_PER_PAGE);
                setGyms((prevGyms) => [...prevGyms, ...data.gyms]); // ensures the new gyms array includes both old (prevGyms) and new gym items (data.gyms)
                setHasMore(data.gyms.length > 0);
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Failed to load gyms:", error);
                }
                else {
                    console.log('An unknown error occurred.');
                }
            }
        };
        loadGyms();
    }, [page]);

    const loadMore = () => {
        if (hasMore) setPage((prevPage) => prevPage + 1);
    };

    return (
        <div className="homepage">
            <h1>Nearby Gyms</h1>
            <div className="gym-grid">
                {gyms.map((gym) => (
                    <GymCard key={gym.id} name={gym.name} address={ gym.address } />
                ))}
            </div>
            {hasMore && (
                <button onClick={loadMore} className="load-more">
                    Load More
                </button>
            )}
        </div>
    );
};
export default HomePage;