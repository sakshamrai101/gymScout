import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// ✅ Route to handle Gym Owners Inquiry (Send Email)
router.post("/", async (req, res) => {
    const { name, gymName, email, message } = req.body;

    if (!name || !gymName || !email || !message) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Your Gmail
                pass: process.env.EMAIL_PASS, // Your Gmail App Password
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "raisaksham2001@gmail.com", // Your receiving email
            subject: "New Gym Pricing Inquiry",
            text: `
                Name: ${name}
                Gym Name: ${gymName}
                Email: ${email}
                Message: ${message}
            `,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully!" });

    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send email." });
    }
});

export default router;
