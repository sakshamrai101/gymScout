import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./styles/index.css";
const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("Root not found.");
}
const root = ReactDOM.createRoot(rootElement);
root.render(React.createElement(React.StrictMode, null,
    React.createElement(App, null)));
