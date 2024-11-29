"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Calling the connectDB fn from db to integrate the database connection. 
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
(0, db_1.default)();
app.get("/", (req, res) => {
    res.send("API is running .....");
});
const PORT = process.env.PORT || 500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
