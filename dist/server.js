"use strict";
// server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const path_1 = __importDefault(require("path"));
const gyms_1 = __importDefault(require("./routes/gyms"));
const app = (0, express_1.default)();
// Connect to the database
(0, db_1.default)();
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api/gyms', gyms_1.default);
// Serve static files
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
const PORT = process.env.PORT || 500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
