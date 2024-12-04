"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Calling the connectDB fn from db to integrate the database connection. 
var express_1 = require("express");
var db_1 = require("./config/db");
var gyms_1 = require("./routes/gyms");
var path_1 = require("path");
var app = (0, express_1.default)();
(0, db_1.default)();
// Middleware 
app.use(express_1.default.json());
// Routes 
app.use("/api/gyms", gyms_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
var PORT = process.env.PORT || 500;
app.listen(PORT, function () { return console.log("Server running on port ".concat(PORT)); });
