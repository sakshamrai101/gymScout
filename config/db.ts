import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        console.log("MONGO_URI:", process.env.MONGO_URI);

        const conn = await mongoose.connect(process.env.MONGO_URI || "");
        // Set up mongoose event listeners immediately
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connection established!");
        });

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        } else {
            console.error("An unknown error occurred.");
        }
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;
