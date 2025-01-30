var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();
// ✅ Route to handle Gym Owners Inquiry (Send Email)
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, gymName, email, message } = req.body;
    if (!name || !gymName || !email || !message) {
        return res.status(400).json({ message: "All fields are required." });
    }
    try {
        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // Your Gmail App Password
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "raisaksham2001@gmail.com",
            subject: "New Gym Pricing Inquiry",
            text: `
                Name: ${name}
                Gym Name: ${gymName}
                Email: ${email}
                Message: ${message}
            `,
        };
        yield transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully!" });
    }
    catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send email." });
    }
}));
export default router;
