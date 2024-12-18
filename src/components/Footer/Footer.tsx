import React from "react";
import "./Footer.css"

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <p>© 2024 GymScout. All Rights Reserved.</p>
            <p>
                Contact us at {" "}
                <a href="mailto: raisaksham2001@gmail.com">raisaksham2001@gmail.com</a>
            </p>
        </footer>
    );
};

export default Footer;