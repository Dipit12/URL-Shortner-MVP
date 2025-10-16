import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
if (!process.env.MONGO_URL) {
    throw new Error("❌ MONGO_URL not found in environment variables");
}
// Create a reusable client connection
const connectToMongo = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL, {
            autoIndex: true,
            maxPoolSize: 10,
        });
        console.log(`✅ MongoDB connected: ${connection.connection.host}`);
        return connection;
    }
    catch (err) {
        console.error("❌ Error connecting to MongoDB:", err);
        process.exit(1);
    }
};
// Export both the mongoose instance and connect function
export { mongoose, connectToMongo };
