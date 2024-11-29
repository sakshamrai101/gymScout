// Calling the connectDB fn from db to integrate the database connection. 
import * as express from 'express';
import connectDB from './config/db';


const app = express();

connectDB();

app.get("/", (req, res) => {
    res.send("API is running .....");
});

const PORT = process.env.PORT || 500;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

