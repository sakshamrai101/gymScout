// db.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Connectioon fn with the db 
import mongoose from 'mongoose';
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('MONGO_URI:', process.env.MONGO_URI);
        const conn = yield mongoose.connect(process.env.MONGO_URI || '');
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
        }
        else {
            console.log('An unknown error occurred.');
        }
        process.exit(1); // Exit the process with failure.
    }
});
export default connectDB;
