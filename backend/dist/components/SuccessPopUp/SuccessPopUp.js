import React from "react";
import "./SuccessPopUp.css";
const SuccessPopUp = ({ message }) => {
    return (React.createElement("div", { className: "success-popup" },
        React.createElement("div", { className: "success-popup-content" },
            React.createElement("span", { className: "checkmark" }, "\u2714"),
            React.createElement("p", null, message))));
};
export default SuccessPopUp;
