import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async() => {
    try {
        const conn = await mongoose.connect(ENV.MONGO_URI);
        console.log("MongoDB Connected Successfully:", conn.connection.host)
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

