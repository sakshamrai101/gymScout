import React from "react";
import "./Header.css";

const Header: React.FC = () => {
    return (
        <header className="header">
            <h1>GymScout</h1>
            <p>One-stop place to find the best fitness center near you</p>
        </header>
    );
};

export default Header;