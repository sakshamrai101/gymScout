// db.ts

// Connectioon fn with the db 

import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        console.log('MONGO_URI:', process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI || '');
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
        } else {
            console.log('An unknown error occurred.');
        }
        process.exit(1); // Exit the process with failure.
    }
};

export default connectDB;
