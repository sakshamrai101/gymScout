// database connection logic:


import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

// fn to add mongodb connection to the app.

// async: a fn that can take time to perform tasks (db connection, API Calls), w/o blocking the program.
// promise: an object returned from an async fn (has 3 possible values, pending, fulfilled and rejected).

const connectDB = async(): Promise<void> => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || "");
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
        }
        else {
            console.log(`An unknown error occurred. `);
        }
        process.exit(1); // Exit the process with failure. 
    }
}

export default connectDB;


