var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from "react";
import { useState, useEffect } from "react";
import "../styles/HomePage.css";
import fetchGyms from "../utils/scraper.js";
// component for displaying individual gym card:
const GymCard = ({ name, address }) => (React.createElement("div", { className: "gym-card" },
    React.createElement("h3", null, name),
    React.createElement("p", null, address)));
const HomePage = () => {
    const [gyms, setGyms] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const ITEMS_PER_PAGE = 8;
    useEffect(() => {
        const loadGyms = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const data = yield fetchGyms(page, ITEMS_PER_PAGE);
                setGyms((prevGyms) => [...prevGyms, ...data.gyms]); // ensures the new gyms array includes both old (prevGyms) and new gym items (data.gyms)
                setHasMore(data.gyms.length > 0);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error("Failed to load gyms:", error);
                }
                else {
                    console.log('An unknown error occurred.');
                }
            }
        });
        loadGyms();
    }, [page]);
    const loadMore = () => {
        if (hasMore)
            setPage((prevPage) => prevPage + 1);
    };
    return (React.createElement("div", { className: "homepage" },
        React.createElement("h1", null, "Nearby Gyms"),
        React.createElement("div", { className: "gym-grid" }, gyms.map((gym) => (React.createElement(GymCard, { key: gym.id, name: gym.name, address: gym.address })))),
        hasMore && (React.createElement("button", { onClick: loadMore, className: "load-more" }, "Load More"))));
};
export default HomePage;
