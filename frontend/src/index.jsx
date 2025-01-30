import React from "react";
import ReactDOM from "react-dom/client";
import App from './App'; // Main App component
import "./index.css"

// Ensure the root element exists before rendering
const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Root element with id 'root' not found. Please check your HTML structure.");
}

// Create a React root and render the App component
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
