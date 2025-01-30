import React, { useState } from "react";
import axios from "axios";
import "./Footer.css";

const Footer: React.FC = () => {
    const [name, setName] = useState("");
    const [gymName, setGymName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        if (!name || !gymName || !email || !message) {
            setError("All fields are required.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5001/api/send-email", {
                name,
                gymName,
                email,
                message,
            });

            if (response.status === 200) {
                setSubmitted(true);
            } else {
                setError("Failed to send inquiry. Please try again.");
            }
        } catch (error) {
            console.error("Error sending inquiry:", error);
            setError("Failed to send inquiry. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="footer">
            <div className="gym-owner-section">
                <h3 className="gym-owner-heading">Are you a Gym Owner?</h3>
                <p>Reach out to get your pricing listed on GymScout!</p>

                {!submitted ? (
                    <form className="gym-owner-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Gym Name"
                            value={gymName}
                            onChange={(e) => setGymName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <textarea
                            placeholder="Your Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? "Sending..." : "Submit Inquiry"}
                        </button>
                        {error && <p className="error-message">{error}</p>}
                    </form>
                ) : (
                    <p className="success-message">✅ Inquiry sent! I'll get back to you soon.</p>
                )}
            </div>
        </footer>
    );
};

export default Footer;
