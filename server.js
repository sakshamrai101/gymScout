"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Calling the connectDB fn from db to integrate the database connection. 
var express = require("express");
var db_1 = require("./config/db");
var app = express();
(0, db_1.default)();
app.get("/", function (req, res) {
    res.send("API is running .....");
});
var PORT = process.env.PORT || 500;
app.listen(PORT, function () { return console.log("Server running on port ".concat(PORT)); });
