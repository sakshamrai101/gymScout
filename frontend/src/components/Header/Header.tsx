import React from "react";
import "./Header.css";

const Header: React.FC = () => {
    return (
        <header className="header">
            <h1 className="header-title">GymScout</h1>
            <p className="header-tagline">
                Your one-stop solution to finding the best fitness centers near you
            </p>
        </header>
    );
};

export default Header;
