import React from "react";
import "./SuccessPopUp.css";

interface SuccessPopUpProps {
    message: string;
}

const SuccessPopUp: React.FC<SuccessPopUpProps> = ({message}) => {
    return (
        <div className="success-popup">
            <div className="success-popup-content">
                <span className="checkmark">✔</span>
                <p>{message}</p>
            </div>

        </div>
    )
}

export default SuccessPopUp;